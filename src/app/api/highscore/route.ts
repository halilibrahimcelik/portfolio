import { getRedisClient } from "@/lib/redis";

const KEY = "moonrun:highscore";

export async function GET() {
  try {
    const redis = await getRedisClient();
    const value = await redis.get(KEY);
    const highscore = value ? parseInt(value, 10) : 0;
    return Response.json({ highscore });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { score } = await req.json();
    if (typeof score !== "number" || score < 0) {
      return Response.json({ error: "Invalid score" }, { status: 400 });
    }
    const redis = await getRedisClient();
    const current = await redis.get(KEY);
    const currentBest = current ? parseInt(current, 10) : 0;
    if (score > currentBest) {
      await redis.set(KEY, String(score));
return Response.json({ highscore: score, updated: true });
    }
    return Response.json({ highscore: currentBest, updated: false });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
