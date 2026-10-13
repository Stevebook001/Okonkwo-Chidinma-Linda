import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAIN_HOSTS = new Set(["ocl.it.com", "www.ocl.it.com"]);
const PRIVATE_HOSTS = new Set(["admin.ocl.it.com", "account.ocl.it.com", "api.ocl.it.com"]);
const LEGAL_PAGES = [
  ["privacy", 0.3],
  ["terms", 0.3],
  ["refund", 0.3],
  ["drug-policy", 0.4],
  ["kedi-seller-policy", 0.4],
  ["code-of-conduct", 0.3],
  ["ads", 0.3],
  ["medical-disclaimer", 0.4],
] as const;

// Keep this list in sync with articles that are actually published on the blog.
// Drafts and unapproved product pages must never be added to a public sitemap.
const PUBLISHED_ARTICLES = [
  "read-a-medicine-label",
  "questions-for-your-pharmacist",
  "sustainable-nutrition-habits",
  "storing-medicines-safely",
  "prepare-for-pharmacist-visit",
  "understanding-supplement-labels",
  "safe-use-of-over-the-counter-medicines",
  "building-a-personal-medicine-list",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host")?.split(":")[0]?.toLowerCase() ?? "ocl.it.com";
  const origin = `https://${host}`;
  const now = new Date();

  // Private dashboards and API hosts should not advertise URLs for indexing.
  if (PRIVATE_HOSTS.has(host)) return [];

  if (host === "blogs.ocl.it.com") {
    return [
      { url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 },
      ...PUBLISHED_ARTICLES.map((slug) => ({
        url: `${origin}/articles/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  }

  if (MAIN_HOSTS.has(host)) {
    return [
      { url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 },
      ...LEGAL_PAGES.map(([slug, priority]) => ({
        url: `${origin}/legal/${slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority,
      })),
    ];
  }

  // Each public subdomain gets a same-host sitemap with its own landing page.
  // Add deeper URLs only after the corresponding pages are implemented and public.
  return [{ url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 }];
}
