export interface Vec2 {
  x: number;
  y: number;
}

export interface Astronaut {
  y: number;
  vy: number;
  onGround: boolean;
  jumpCount: number;
}

export interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  verts: Vec2[];
  color: string;
  glow: string;
  rot: number;
  rotSpd: number;
  aerial: boolean;
}

export interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  r: number;
}

export interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
  alpha: number;
}

export type GamePhase = 'idle' | 'running' | 'dead';

export interface GameState {
  phase: GamePhase;
  score: number;
  best: number;
  astronaut: Astronaut;
  obstacles: Obstacle[];
  dust: DustParticle[];
  stars: Star[];
  speed: number;
  spawnTimer: number;
  nextSpawnIn: number;
  frameCount: number;
  hasPlayed: boolean;
  newBestFired: boolean;
}

// ── Constants ──
export const W = 280;
export const H = 160;
export const GROUND_Y = H - 28;
export const GRAVITY = 0.38;
export const JUMP_VEL = -8.5;
export const ASTRO_W = 18;
export const ASTRO_H = 24;
export const ASTRO_X = 42;
export const SPEED_INIT = 2.8;
export const SPEED_MAX = 7.5;
export const SPAWN_INTERVAL_INIT = 95;
export const SPAWN_INTERVAL_MIN = 52;

export const GROUND_PRESETS = [
  { w: 14, h: 16, r: 9,  color: '#6c8cff', glow: 'rgba(108,140,255,0.4)' },
  { w: 20, h: 20, r: 12, color: '#a78bfa', glow: 'rgba(167,139,250,0.4)' },
  { w: 10, h: 22, r: 8,  color: '#38bdf8', glow: 'rgba(56,189,248,0.4)'  },
  { w: 22, h: 14, r: 10, color: '#6c8cff', glow: 'rgba(108,140,255,0.4)' },
] as const;

export const AERIAL_PRESETS = [
  { w: 11, h: 11, r: 7, color: '#fb923c', glow: 'rgba(251,146,60,0.5)'  },
  { w: 13, h: 13, r: 8, color: '#f87171', glow: 'rgba(248,113,113,0.5)' },
  { w: 9,  h: 9,  r: 6, color: '#fbbf24', glow: 'rgba(251,191,36,0.5)'  },
] as const;

export const CONFETTI_COLORS = ['#6c8cff', '#a78bfa', '#fbbf24', '#f87171', '#4ade80', '#38bdf8'];
