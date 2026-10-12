export async function GET() {
  return Response.json(
    {
      service: "OCL Health",
      status: "ok",
      timestamp: new Date().toISOString(),
      note: "This endpoint checks that the Next.js application is responding. It does not represent database, email, payment or third-party service health.",
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
