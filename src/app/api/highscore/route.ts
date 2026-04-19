import { unstable_cache } from "next/cache";
import { getRedisClient } from "@/lib/redis";

const KEY = "moonrun:highscore";
const CACHE_TAG = "moonrun-highscore";

const getCachedHighscore = unstable_cache(
  async () => {
    const redis = await getRedisClient();
    const value = await redis.get(KEY);
    return value ? parseInt(value, 10) : 0;
  },
  [CACHE_TAG],
  { tags: [CACHE_TAG], revalidate: 300 },
);

export async function GET() {
  try {
    const highscore = await getCachedHighscore();
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
