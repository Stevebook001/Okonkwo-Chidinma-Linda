import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "OCL Health Journal";
  let category = "HEALTH EDUCATION";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (url && key) {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data } = await db.from("posts").select("title,category").eq("slug", slug).eq("status", "published").maybeSingle();
    if (data) { title = data.title; category = String(data.category).toUpperCase(); }
  }
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "66px", background: "linear-gradient(135deg,#ffffff 0%,#eef8ff 58%,#cdeaff 100%)", color: "#08243d", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}><div style={{ width: "76px", height: "76px", borderRadius: "22px", display: "flex", alignItems: "center", justifyContent: "center", background: "#0878df", color: "#fff", fontSize: "48px" }}>✚</div><div style={{ fontSize: "32px", fontWeight: 800 }}>OCL <span style={{ color: "#0878df" }}>Health</span></div></div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}><div style={{ fontSize: "22px", color: "#0878df", fontWeight: 800, letterSpacing: "3px" }}>{category}</div><div style={{ fontSize: "56px", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1px" }}>{title}</div><div style={{ fontSize: "25px", color: "#49657c" }}>Clear information. Responsible health education.</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px", color: "#0878df" }}><span>blogs.ocl.it.com</span><span>OCL Health · GitHub</span></div>
    </div>,
    { ...size, headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } }
  );
}
