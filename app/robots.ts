import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.split(":")[0]?.toLowerCase() ?? "ocl.it.com";
  const sitemap = `https://${host}/sitemap.xml`;

  if (["admin.ocl.it.com", "account.ocl.it.com", "api.ocl.it.com"].includes(host)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  if (host === "ocl.it.com" || host === "www.ocl.it.com") {
    return {
      rules: [
        { userAgent: "*", allow: "/", disallow: ["/admin", "/account", "/auth", "/api"] },
      ],
      sitemap,
    };
  }

  return { rules: { userAgent: "*", allow: "/" }, sitemap };
}
