import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const publicHosts = new Set([
  "ocl.it.com",
  "www.ocl.it.com",
  "blogs.ocl.it.com",
  "shop.ocl.it.com",
  "developers.ocl.it.com",
  "docs.ocl.it.com",
  "status.ocl.it.com",
  "support.ocl.it.com",
]);

// Best-effort per-instance abuse protection. Do not store IP addresses in analytics rows.
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(request: NextRequest) {
  const now = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const current = hits.get(ip);
  if (!current || current.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 30;
}

export async function POST(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  if (!publicHosts.has(host)) {
    return NextResponse.json({ error: "Analytics are not enabled on this host." }, { status: 404 });
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host.toLowerCase() !== host) {
        return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
    }
  }

  if (rateLimited(request)) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429, headers: { "Cache-Control": "no-store" } });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const eventName = body.eventName === "page_view" ? "page_view" : null;
  const pagePath = typeof body.pagePath === "string" ? body.pagePath : "";
  if (!eventName || !pagePath.startsWith("/") || pagePath.length > 300 || pagePath.includes("?") || pagePath.includes("#") || pagePath.startsWith("//")) {
    return NextResponse.json({ error: "Unsupported analytics event." }, { status: 400 });
  }

  let referrerHost: string | null = null;
  if (typeof body.referrerHost === "string" && body.referrerHost.length <= 253) {
    try {
      const candidate = body.referrerHost.includes("://") ? new URL(body.referrerHost).hostname : body.referrerHost;
      if (/^[a-z0-9.-]+$/i.test(candidate)) referrerHost = candidate.toLowerCase();
    } catch {
      referrerHost = null;
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Analytics storage is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.from("analytics_events").insert({
    event_name: eventName,
    page_path: pagePath,
    referrer_host: referrerHost,
    source: "first_party",
    metadata: { host },
  });

  if (error) {
    console.error("OCL analytics write failed", error.message);
    return NextResponse.json({ error: "Analytics event could not be recorded." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json({ ok: true }, { status: 202, headers: { "Cache-Control": "no-store" } });
}
