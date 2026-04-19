import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

const KEY = "moonrun:highscore";

export async function GET() {
  try {
    const redis = await getRedisClient();
    const value = await redis.get(KEY);
    return NextResponse.json({ highscore: value ? parseInt(value, 10) : 0 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get highscore" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { score } = await req.json();
    if (typeof score !== "number" || score < 0) {
      return NextResponse.json({ error: "Invalid score" }, { status: 400 });
    }

    const redis = await getRedisClient();
    const current = await redis.get(KEY);
    const currentBest = current ? parseInt(current, 10) : 0;

    if (score > currentBest) {
      await redis.set(KEY, String(Math.floor(score)));
      return NextResponse.json({ highscore: Math.floor(score), updated: true });
    }

    return NextResponse.json({ highscore: currentBest, updated: false });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update highscore" }, { status: 500 });
  }
}
