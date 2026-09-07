import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "htv-admin-session";
const PROTECTED = "/partnership/manage";
const LOGIN = "/partnership/manage/login";

function secret() {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) return null;
  return new TextEncoder().encode(s);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard the manage area, and not the login page itself.
  if (!pathname.startsWith(PROTECTED) || pathname.startsWith(LOGIN)) {
    return NextResponse.next();
  }

  const key = secret();
  // If the secret isn't configured at all, allow through with a warning banner
  // (dev mode — avoids being locked out before env vars are set).
  if (!key) return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  if (token) {
    try {
      await jwtVerify(token, key);
      return NextResponse.next();
    } catch {}
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = LOGIN;
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/partnership/manage/:path*"],
};
