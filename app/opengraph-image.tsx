import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const alt = "OCL Health — Pharmacy, Chemistry and Wellness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "linear-gradient(135deg, #ffffff 0%, #eef8ff 58%, #cdeaff 100%)", color: "#08243d", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
        <div style={{ width: "86px", height: "86px", borderRadius: "26px", display: "flex", alignItems: "center", justifyContent: "center", background: "#0878df", color: "#ffffff", fontSize: "56px", fontWeight: 800 }}>✚</div>
        <div style={{ fontSize: "38px", fontWeight: 800 }}>OCL <span style={{ color: "#0878df" }}>Health</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: "62px", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1 }}>Better health decisions start with better information.</div>
        <div style={{ fontSize: "28px", color: "#49657c" }}>Pharmacy · Chemistry · Wellness · Health Education</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "23px", color: "#0878df" }}>
        <span>ocl.it.com</span><span>GitHub · OCL Health</span>
      </div>
    </div>,
    { ...size, headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } }
  );
}
