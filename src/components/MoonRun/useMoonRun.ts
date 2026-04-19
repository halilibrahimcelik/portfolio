"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  AERIAL_PRESETS,
  ASTRO_H,
  ASTRO_W,
  ASTRO_X,
  CONFETTI_COLORS,
  DustParticle,
  GamePhase,
  GameState,
  GROUND_PRESETS,
  GROUND_Y,
  GRAVITY,
  H,
  JUMP_VEL,
  Obstacle,
  SPAWN_INTERVAL_INIT,
  SPAWN_INTERVAL_MIN,
  SPEED_INIT,
  SPEED_MAX,
  Star,
  Vec2,
  W,
} from "./moonrun.types";

// ── Helpers ──
function makeRock(r: number, seed: number): Vec2[] {
  const n = 7 + (seed % 3);
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const jitter = 0.55 + ((seed * (i + 1) * 6301) % 100) / 222;
    return { x: Math.cos(a) * r * jitter, y: Math.sin(a) * r * jitter };
  });
}

function makeStars(): Star[] {
  return [
    ...Array.from({ length: 30 }, () => ({
      x: Math.random() * W,
      y: Math.random() * (GROUND_Y - 20),
      speed: 0.3,
      size: 0.7,
      alpha: 0.3 + Math.random() * 0.3,
    })),
    ...Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * (GROUND_Y - 20),
      speed: 0.7,
      size: 1.1,
      alpha: 0.5 + Math.random() * 0.3,
    })),
    ...Array.from({ length: 8 }, () => ({
      x: Math.random() * W,
      y: Math.random() * (GROUND_Y - 20),
      speed: 1.3,
      size: 1.6,
      alpha: 0.7 + Math.random() * 0.3,
    })),
  ];
}

function aerialChance(score: number): number {
  return Math.min(0.55, (score - 20) / 100);
}

function makeInitialState(): GameState {
  return {
    phase: "idle",
    score: 0,
    best: 0,
    astronaut: { y: GROUND_Y - ASTRO_H, vy: 0, onGround: true, jumpCount: 0 },
    obstacles: [],
    dust: [],
    stars: makeStars(),
    speed: SPEED_INIT,
    spawnTimer: 0,
    nextSpawnIn: SPAWN_INTERVAL_INIT,
    frameCount: 0,
    hasPlayed: false,
    newBestFired: false,
  };
}

function spawnGroundObstacle(state: GameState): Obstacle {
  const preset =
    GROUND_PRESETS[Math.floor(Math.random() * GROUND_PRESETS.length)];
  const seed = Math.floor(Math.random() * 900);
  return {
    x: W + 20,
    y: GROUND_Y - preset.h,
    w: preset.w,
    h: preset.h,
    verts: makeRock(preset.r, seed),
    color: preset.color,
    glow: preset.glow,
    rot: Math.random() * Math.PI * 2,
    rotSpd: (Math.random() - 0.5) * 0.04,
    aerial: false,
  };
}

function spawnAerialObstacle(score: number): Obstacle {
  const preset =
    AERIAL_PRESETS[Math.floor(Math.random() * AERIAL_PRESETS.length)];
  const seed = Math.floor(Math.random() * 900);
  const maxMidChance = Math.min(0.6, (score - 40) / 80);
  const useMid = score >= 40 && Math.random() < maxMidChance;
  const y = useMid ? 45 + Math.random() * 30 : 10 + Math.random() * 30;
  return {
    x: W + 20,
    y,
    w: preset.w,
    h: preset.h,
    verts: makeRock(preset.r, seed),
    color: preset.color,
    glow: preset.glow,
    rot: Math.random() * Math.PI * 2,
    rotSpd: (Math.random() - 0.5) * 0.06,
    aerial: true,
  };
}

function spawnDust(x: number, y: number): DustParticle[] {
  return Array.from({ length: 5 }, () => ({
    x,
    y,
    vx: (Math.random() - 0.5) * 2.5,
    vy: -Math.random() * 2,
    life: 14 + Math.random() * 10,
    maxLife: 24,
    r: 1.5 + Math.random() * 1.5,
  }));
}

function hitTest(state: GameState): boolean {
  const ax = ASTRO_X + 4,
    ay = state.astronaut.y + 4;
  const aw = ASTRO_W - 8,
    ah = ASTRO_H - 4;
  return state.obstacles.some((ob) => {
    const ox = ob.x + 3,
      oy = ob.y + 3,
      ow = ob.w - 6,
      oh = ob.h - 6;
    return ax < ox + ow && ax + aw > ox && ay < oy + oh && ay + ah > oy;
  });
}

// ── Confetti ──
function fireMiniConfetti(canvasEl: HTMLCanvasElement) {
  const rect = canvasEl.getBoundingClientRect();
  const ox = (rect.left + rect.right) / 2 / window.innerWidth;
  const oy = rect.top / window.innerHeight;
  confetti({
    particleCount: 28,
    angle: 90,
    spread: 70,
    origin: { x: ox, y: oy + 0.1 },
    colors: CONFETTI_COLORS,
    scalar: 0.65,
    gravity: 1.2,
    ticks: 120,
  });
}

function fireBurstConfetti() {
  confetti({
    particleCount: 60,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 1 },
    colors: CONFETTI_COLORS,
    scalar: 0.85,
    gravity: 0.9,
    drift: 0.1,
  });
  confetti({
    particleCount: 60,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 1 },
    colors: CONFETTI_COLORS,
    scalar: 0.85,
    gravity: 0.9,
    drift: -0.1,
  });
}

// ── Draw ──
function draw(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  frameCount: number,
) {
  const { astronaut: astro, obstacles, dust, stars } = state;

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  bgGrad.addColorStop(0, "#020408");
  bgGrad.addColorStop(1, "#07090f");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, GROUND_Y);

  // Earth
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  ctx.arc(W - 38, 38, 26, 0, Math.PI * 2);
  ctx.fillStyle = "#1a4a8a";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W - 34, 30, 12, 0, Math.PI * 2);
  ctx.fillStyle = "#1d6b3e";
  ctx.fill();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#6c8cff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(W - 38, 38, 26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Stars
  stars.forEach((s) => {
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Ground
  const gGrad = ctx.createLinearGradient(0, GROUND_Y, 0, H);
  gGrad.addColorStop(0, "#1a1d26");
  gGrad.addColorStop(1, "#0d0f15");
  ctx.fillStyle = gGrad;
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
  ctx.strokeStyle = "rgba(168,179,207,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(W, GROUND_Y);
  ctx.stroke();

  // Dust particles
  dust.forEach((p) => {
    ctx.globalAlpha = (p.life / p.maxLife) * 0.6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(168,179,207,0.8)";
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Obstacles
  obstacles.forEach((ob) => {
    if (ob.aerial) {
      const cx = ob.x + ob.w / 2,
        cy = ob.y + ob.h / 2;
      const lineLen = Math.min(60, ob.x - W * 0.3);
      if (lineLen > 4) {
        const lg = ctx.createLinearGradient(cx - lineLen, cy, cx, cy);
        lg.addColorStop(0, "rgba(0,0,0,0)");
        lg.addColorStop(1, ob.color + "55");
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(cx - lineLen, cy);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    ctx.save();
    ctx.translate(ob.x + ob.w / 2, ob.y + ob.h / 2);
    ctx.rotate(ob.rot);
    ctx.shadowColor = ob.glow;
    ctx.shadowBlur = ob.aerial ? 12 : 8;
    ctx.beginPath();
    ob.verts.forEach((v, i) =>
      i === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y),
    );
    ctx.closePath();
    ctx.strokeStyle = ob.color;
    ctx.lineWidth = ob.aerial ? 1.8 : 1.5;
    ctx.stroke();
    ctx.fillStyle = ob.glow.replace(/[\d.]+\)$/, "0.1)");
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  });

  // Astronaut
  const dead = state.phase === "dead";
  const inAir = !astro.onGround;
  const legSwing = astro.onGround ? Math.sin(frameCount * 0.35) * 5 : 0;

  ctx.save();
  ctx.translate(ASTRO_X + ASTRO_W / 2, astro.y + ASTRO_H / 2);
  if (!dead) {
    ctx.shadowColor = "rgba(108,140,255,0.5)";
    ctx.shadowBlur = 8;
  }

  // Legs
  [
    [-4, 1],
    [4, -1],
  ].forEach(([tx, dir], side) => {
    ctx.save();
    ctx.translate(tx, 8);
    ctx.rotate(legSwing * 0.08 * dir);
    ctx.fillStyle = dead ? "#2d3748" : "#c7d0e8";
    ctx.fillRect(-2.5, 0, 5, 9);
    ctx.fillStyle = dead ? "#1f2937" : "#6c8cff";
    ctx.fillRect(-3, 7, 7, 4);
    ctx.restore();
  });

  // Body
  ctx.fillStyle = dead ? "#374151" : "#dde3f0";
  ctx.beginPath();
  ctx.roundRect(-7, -8, 14, 16, 3);
  ctx.fill();
  ctx.fillStyle = dead ? "#1f2937" : "rgba(108,140,255,0.7)";
  ctx.fillRect(-3, -4, 6, 5);

  // Arms
  [
    [-7, -1],
    [7, 1],
  ].forEach(([tx, dir]) => {
    ctx.save();
    ctx.translate(tx, -4);
    ctx.rotate(inAir ? 0.4 * dir : legSwing * 0.07 * dir);
    ctx.fillStyle = dead ? "#2d3748" : "#c7d0e8";
    ctx.fillRect(dir > 0 ? 0 : -4, 0, 4, 9);
    ctx.restore();
  });

  // Helmet
  ctx.fillStyle = dead ? "#1f2937" : "#1a2035";
  ctx.beginPath();
  ctx.arc(0, -12, 8, 0, Math.PI * 2);
  ctx.fill();

  // Visor
  const vg = ctx.createRadialGradient(1, -13, 1, 1, -13, 6);
  vg.addColorStop(0, dead ? "rgba(108,140,255,0.1)" : "rgba(147,197,253,0.9)");
  vg.addColorStop(1, dead ? "rgba(108,140,255,0.05)" : "rgba(108,140,255,0.7)");
  ctx.fillStyle = vg;
  ctx.beginPath();
  ctx.ellipse(1, -12, 5, 4.5, 0.1, 0, Math.PI * 2);
  ctx.fill();
  if (!dead) {
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.ellipse(-1, -14, 2, 1.2, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Jetpack flame
  if (inAir && !dead) {
    const ph = 6 + Math.random() * 6;
    const pg = ctx.createLinearGradient(0, 9, 0, 9 + ph);
    pg.addColorStop(0, "rgba(108,140,255,0.85)");
    pg.addColorStop(1, "rgba(167,139,250,0)");
    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.moveTo(-5, 8);
    ctx.lineTo(5, 8);
    ctx.lineTo(0, 8 + ph);
    ctx.closePath();
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  ctx.restore();

  // Overlays
  if (state.phase === "idle") {
    ctx.fillStyle = "rgba(2,4,8,0.75)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    // ctx.font = '15px "Press Start 2P"';
    // ctx.fillStyle = "#a78bfaaa";
    // ctx.shadowColor = "rgba(167,139,250,0.5)";
    // ctx.shadowBlur = 12;
    // ctx.fillText("MOON RUN", W / 2, H / 2 - 39);
    ctx.shadowBlur = 0;
    ctx.font = '16px "Press Start 2P"';
    ctx.fillStyle = "#8b9cc8";
    "SPACE OR TAP\nTO START".split("\n").forEach((line, i) => {
      ctx.fillText(line, W / 2, H / 2 - 29 + i * 22);
    });
    const bw = 130,
      bh = 26,
      bx = W / 2 - bw / 2,
      by = H / 2 + 8;
    const bg = ctx.createLinearGradient(bx, by, bx + bw, by);
    bg.addColorStop(0, "#6c8cff");
    bg.addColorStop(1, "#a78bfa");
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 6);
    ctx.fill();
    ctx.font = '11px "Press Start 2P"';
    ctx.fillStyle = "#fff";
    ctx.fillText("▶  RUN", W / 2, by + 16);
    ctx.textAlign = "left";
  }

  if (state.phase === "dead") {
    ctx.fillStyle = "rgba(2,4,8,0.8)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.font = '15px "Press Start 2P"';
    ctx.fillStyle = "#f87171";
    ctx.shadowColor = "rgba(248,113,113,0.4)";
    ctx.shadowBlur = 10;
    ctx.fillText("YOU DRIFTED OFF", W / 2, H / 2 - 32);
    ctx.shadowBlur = 0;
    ctx.font = '13px "Press Start 2P"';
    ctx.fillStyle = "#9ca3af";
    ctx.fillText(
      `SCORE  ${String(Math.floor(state.score)).padStart(4, "0")}`,
      W / 2,
      H / 2 - 6,
    );
    if (state.score > 0 && state.score >= state.best) {
      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "rgba(251,191,36,0.4)";
      ctx.shadowBlur = 8;
      ctx.font = '12px "Press Start 2P"';
      ctx.fillText("✦ NEW BEST ✦", W / 2, H / 2 + 12);
      ctx.shadowBlur = 0;
    }
    const bw = 130,
      bh = 26,
      bx = W / 2 - bw / 2,
      by = H / 2 + 30;
    const bg = ctx.createLinearGradient(bx, by, bx + bw, by);
    bg.addColorStop(0, "#6c8cff");
    bg.addColorStop(1, "#a78bfa");
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 6);
    ctx.fill();
    ctx.font = '12px "Press Start 2P"';
    ctx.fillStyle = "#fff";
    ctx.fillText("▶  RETRY", W / 2, by + 20);
    ctx.textAlign = "left";
  }
}

// ── Hook ──
export function useMoonRun(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const stateRef = useRef<GameState>(makeInitialState());
  const rafRef = useRef<number | null>(null);

  // Load global highscore from Redis on mount
  useEffect(() => {
    fetch("/api/highscore")
      .then((r) => r.json())
      .then(({ highscore }) => {
        stateRef.current.best = highscore;
        setBest(highscore);
      })
      .catch(() => {});
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    s.frameCount++;

    if (s.phase === "running") {
      // Physics
      s.astronaut.vy += GRAVITY;
      s.astronaut.y += s.astronaut.vy;
      const wasInAir = !s.astronaut.onGround;

      if (s.astronaut.y >= GROUND_Y - ASTRO_H) {
        s.astronaut.y = GROUND_Y - ASTRO_H;
        if (wasInAir)
          s.dust.push(...spawnDust(ASTRO_X + ASTRO_W / 2, GROUND_Y));
        s.astronaut.vy = 0;
        s.astronaut.onGround = true;
        s.astronaut.jumpCount = 0;
      } else {
        s.astronaut.onGround = false;
      }

      // Speed ramp
      s.speed = Math.min(
        SPEED_MAX,
        SPEED_INIT + Math.floor(s.score / 8) * 0.22,
      );
      const spawnInterval = Math.max(
        SPAWN_INTERVAL_MIN,
        SPAWN_INTERVAL_INIT - Math.floor(s.score / 6) * 4,
      );

      // Spawn
      s.spawnTimer++;
      if (s.spawnTimer >= s.nextSpawnIn) {
        const isAerial = s.score >= 20 && Math.random() < aerialChance(s.score);
        s.obstacles.push(
          isAerial ? spawnAerialObstacle(s.score) : spawnGroundObstacle(s),
        );
        s.spawnTimer = 0;
        s.nextSpawnIn = spawnInterval + Math.floor(Math.random() * 35);
      }

      // Move obstacles
      s.obstacles = s.obstacles
        .map((ob) => ({ ...ob, x: ob.x - s.speed, rot: ob.rot + ob.rotSpd }))
        .filter((ob) => ob.x > -50);

      // Move dust
      s.dust = s.dust
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.08,
          life: p.life - 1,
        }))
        .filter((p) => p.life > 0);

      // Scroll stars
      s.stars.forEach((star) => {
        star.x -= star.speed;
        if (star.x < 0) star.x = W + 2;
      });

      // Score
      const prevBest = s.best;
      s.score += 0.04;
      setScore(Math.floor(s.score));
      if (s.score > s.best) {
        s.best = s.score;
        setBest(Math.floor(s.best));
        // Mini confetti mid-run on first beat
        if (
          s.hasPlayed &&
          !s.newBestFired &&
          Math.floor(s.score) > Math.floor(prevBest) &&
          prevBest > 0
        ) {
          s.newBestFired = true;
          fireMiniConfetti(canvas);
        }
      }

      // Collision
      if (hitTest(s)) {
        s.phase = "dead";
        setPhase("dead");
        if (s.hasPlayed && s.score > 0 && s.score >= s.best) {
          setTimeout(fireBurstConfetti, 350);
        }
        // Submit score to Redis
        fetch("/api/highscore", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score: Math.floor(s.score) }),
        })
          .then((r) => r.json())
          .then(({ highscore }) => {
            stateRef.current.best = highscore;
            setBest(highscore);
          })
          .catch(() => {});
      }
    }

    draw(ctx, s, s.frameCount);
    rafRef.current = requestAnimationFrame(tick);
  }, [canvasRef]);

  // Start / stop RAF based on phase
  useEffect(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return stopLoop;
  }, [tick, stopLoop]);

  const handleInput = useCallback(() => {
    const s = stateRef.current;
    if (s.phase === "idle" || s.phase === "dead") {
      // Reset
      s.phase = "running";
      s.score = 0;
      s.astronaut = {
        y: GROUND_Y - ASTRO_H,
        vy: 0,
        onGround: true,
        jumpCount: 0,
      };
      s.obstacles = [];
      s.dust = [];
      s.speed = SPEED_INIT;
      s.spawnTimer = 0;
      s.nextSpawnIn = SPAWN_INTERVAL_INIT + Math.floor(Math.random() * 30);
      s.frameCount = 0;
      s.hasPlayed = true;
      s.newBestFired = false;
      setPhase("running");
      setScore(0);
    } else if (s.phase === "running") {
      // Jump (double jump allowed)
      if (s.astronaut.jumpCount < 2) {
        s.astronaut.vy = JUMP_VEL;
        s.astronaut.onGround = false;
        s.astronaut.jumpCount++;
        s.dust.push(...spawnDust(ASTRO_X + ASTRO_W / 2, GROUND_Y));
      }
    }
  }, []);

  return { phase, score, best, handleInput };
}
