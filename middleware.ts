import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";

  if (hostname === "admin.ocl.it.com") {
    const username = process.env.OCL_ADMIN_USER;
    const password = process.env.OCL_ADMIN_PASSWORD;

    // Fail closed until the owner sets unique credentials in Vercel.
    if (!username || !password) {
      return new NextResponse("OCL admin access is locked until OCL_ADMIN_USER and OCL_ADMIN_PASSWORD are configured in Vercel.", {
        status: 503,
        headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow, noarchive" }
      });
    }

    const authorization = request.headers.get("authorization");
    if (authorization?.startsWith("Basic ")) {
      try {
        const [providedUser, ...passwordParts] = atob(authorization.slice(6)).split(":");
        if (providedUser === username && passwordParts.join(":") === password) {
          const response = NextResponse.next();
          response.headers.set("Cache-Control", "private, no-store, max-age=0");
          response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
          return response;
        }
      } catch {
        // Invalid credentials are rejected below.
      }
    }

    return new NextResponse("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="OCL Admin", charset="UTF-8"', "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" }
    });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.next({ request });

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });
  await supabase.auth.getClaims();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
