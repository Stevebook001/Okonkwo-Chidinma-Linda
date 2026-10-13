export const dynamic = "force-dynamic";

export async function GET() {
  const configured = (process.env.ADSENSE_PUBLISHER_ID ?? "").trim();
  const publisherId = configured.startsWith("ca-pub-")
    ? configured.slice(3)
    : configured;

  // Return no seller declaration until the real, approved publisher ID is configured.
  if (!/^pub-\d+$/.test(publisherId)) {
    return new Response("AdSense publisher ID has not been configured.\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
