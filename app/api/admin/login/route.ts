import { NextResponse, type NextRequest } from "next/server";
import { signSession, COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password || password !== expected) {
    // Constant-time-ish — avoid instant timing leak
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await signSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return res;
}
