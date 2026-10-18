import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAIN_HOSTS = new Set(["ocl.it.com", "www.ocl.it.com"]);
const PRIVATE_HOSTS = new Set(["admin.ocl.it.com", "admin.builder.ocl.it.com", "account.ocl.it.com", "api.ocl.it.com"]);
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
const DOC_PAGES = ["getting-started","account-security","publishing-workflow","product-compliance","analytics-and-privacy","email-and-notifications","api-authentication","api-rate-limits","api-errors","webhook-security","webhook-retries","product-catalogue-api","content-api","order-lifecycle","privacy-by-design","seller-onboarding","product-image-guidelines","seo-metadata","open-graph","sitemap-management","accessibility","incident-response","account-recovery","email-delivery","newsletter-consent","refund-workflow","inventory-updates","health-content-review","editorial-policy","analytics-events","visitor-presence","search-console","vercel-deployment","domain-configuration","dns-basics","environment-variables","admin-access","audit-logging","database-backups","row-level-security","data-retention","security-reporting","payment-provider-setup","manual-payment-orders","virtual-accounts","checkout-webhooks","order-email-notifications","product-compliance-review","kedi-seller-policy","api-key-management","sdk-overview","changelog"] as const;

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

  if (host === "docs.ocl.it.com") return [{ url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 }, ...DOC_PAGES.map((slug) => ({ url: `${origin}/docs/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }))];

  if (host === "builder.ocl.it.com") return [{ url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 }];

  if (host === "shop.ocl.it.com") {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) return [{ url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 }, { url: `${origin}/catalog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 }];
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data } = await db.from("products").select("slug,updated_at").eq("status", "active").eq("prescription_required", false).limit(500);
    return [{ url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 }, { url: `${origin}/catalog`, lastModified: now, changeFrequency: "daily", priority: 0.8 }, ...(data ?? []).map(p => ({ url: `${origin}/catalog/${p.slug}`, lastModified: p.updated_at ? new Date(p.updated_at) : now, changeFrequency: "weekly" as const, priority: 0.6 }))];
  }

  if (host === "blogs.ocl.it.com") {
    const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const dbKey = process.env.SUPABASE_SECRET_KEY;
    let dynamicPosts: { slug: string; updated_at: string | null }[] = [];
    if (dbUrl && dbKey) {
      const db = createClient(dbUrl, dbKey, { auth: { persistSession: false, autoRefreshToken: false } });
      const { data } = await db.from("posts").select("slug,updated_at").eq("status", "published").limit(500);
      dynamicPosts = (data ?? []) as typeof dynamicPosts;
    }
    return [
      { url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 },
      ...PUBLISHED_ARTICLES.map((slug) => ({ url: `${origin}/articles/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
      ...dynamicPosts.map((post) => ({ url: `${origin}/posts/${post.slug}`, lastModified: post.updated_at ? new Date(post.updated_at) : now, changeFrequency: "monthly" as const, priority: 0.7 })),
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
