import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  const checks: Record<string, string> = {
    application: "ok",
    database: "not_configured",
    email: process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL ? "configured" : "not_configured",
  };

  if (!url || !key) {
    return NextResponse.json(
      { service: "OCL Health", status: "degraded", checks, timestamp: new Date().toISOString() },
      { status: 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
    );
  }

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await supabase.from("profiles").select("id", { head: true, count: "exact" });
    if (error) {
      checks.database = "error";
      return NextResponse.json(
        { service: "OCL Health", status: "degraded", checks, timestamp: new Date().toISOString() },
        { status: 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
      );
    }
    checks.database = "ok";
  } catch {
    checks.database = "error";
    return NextResponse.json(
      { service: "OCL Health", status: "degraded", checks, timestamp: new Date().toISOString() },
      { status: 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
    );
  }

  return NextResponse.json(
    { service: "OCL Health", status: "ok", checks, timestamp: new Date().toISOString() },
    { status: 200, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
  );
}
