import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host !== "admin.ocl.it.com") return NextResponse.next();

  const username = process.env.OCL_ADMIN_USER;
  const password = process.env.OCL_ADMIN_PASSWORD;
  const authorization = request.headers.get("authorization");
  if (username && password && authorization?.startsWith("Basic ")) {
    try {
      const decoded = atob(authorization.slice(6));
      const colon = decoded.indexOf(":");
      if (colon >= 0 && decoded.slice(0, colon) === username && decoded.slice(colon + 1) === password) {
        return NextResponse.next();
      }
    } catch {
      // Invalid Basic Authorization; challenge below.
    }
  }

  return new NextResponse("OCL Admin sign-in required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="OCL Health Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
