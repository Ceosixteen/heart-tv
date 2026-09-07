import { NextResponse } from "next/server";
import { getLiveStatus } from "@/lib/live";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getLiveStatus();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
