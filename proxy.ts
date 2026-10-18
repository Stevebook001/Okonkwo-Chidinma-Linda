import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "@/app/adminAuth";

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";

  const isAdminHost = hostname === "admin.ocl.it.com" || hostname === "admin.builder.ocl.it.com";
  const path = request.nextUrl.pathname;
  if (path.startsWith("/admin") && !isAdminHost) {
    return NextResponse.redirect(new URL("https://admin.ocl.it.com/admin/login"), 307);
  }
  const isAdminRequest = isAdminHost || path === "/admin" || path.startsWith("/admin/");
  if (isAdminRequest) {
    if (path === "/admin/login" || path === "/api/admin/login") {
      const response = NextResponse.next();
      response.headers.set("Cache-Control", "no-store");
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return response;
    }
    const username = process.env.OCL_ADMIN_USER;
    const password = process.env.OCL_ADMIN_PASSWORD;
    if (!username || !password) {
      return new NextResponse("OCL admin access is locked until OCL_ADMIN_USER and OCL_ADMIN_PASSWORD are configured in Vercel.", {
        status: 503,
        headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow, noarchive" }
      });
    }
    const token = request.cookies.get("ocl_admin_session")?.value;
    if (await verifyAdminSessionToken(token, username, password)) {
      const response = isAdminHost && path === "/"
        ? NextResponse.redirect(new URL("/admin", request.url))
        : NextResponse.next();
      response.headers.set("Cache-Control", "private, no-store, max-age=0");
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return response;
    }
    return NextResponse.redirect(new URL("/admin/login", request.url), 307);
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
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
