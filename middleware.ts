import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  if (hostname !== "admin.ocl.it.com") return NextResponse.next();

  const username = process.env.OCL_ADMIN_USER;
  const password = process.env.OCL_ADMIN_PASSWORD;

  // Fail closed: never expose an unauthenticated admin workspace if secrets are missing.
  if (!username || !password) {
    return new NextResponse("OCL admin access is locked until OCL_ADMIN_USER and OCL_ADMIN_PASSWORD are configured in Vercel. Contact the site owner.", {
      status: 503,
      headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Basic ")) {
    try {
      const [providedUser, ...passwordParts] = atob(authorization.slice(6)).split(":");
      const providedPassword = passwordParts.join(":");
      if (providedUser === username && providedPassword === password) {
        const response = NextResponse.next();
        response.headers.set("Cache-Control", "private, no-store, max-age=0");
        response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
        return response;
      }
    } catch {
      // Invalid credentials fall through to the challenge below.
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="OCL Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
