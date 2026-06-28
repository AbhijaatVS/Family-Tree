import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the login page and static assets through
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt")
  ) {
    return NextResponse.next();
  }

  const sitePassword = process.env.SITE_PASSWORD;

  // If no password is configured, let everyone through (safe default)
  if (!sitePassword) return NextResponse.next();

  // Check the auth cookie
  const authToken = request.cookies.get("family_auth")?.value;
  const expectedToken = `auth_${sitePassword}`;

  if (authToken === expectedToken) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to login, preserving the original destination
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt).*)",
  ],
};
