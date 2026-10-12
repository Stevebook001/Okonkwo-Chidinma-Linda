import type { MetadataRoute } from "next";

const site = "https://ocl.it.com";
const blog = "https://blogs.ocl.it.com";
const articles = [
  "read-a-medicine-label",
  "questions-for-your-pharmacist",
  "sustainable-nutrition-habits",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/legal/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/legal/code-of-conduct`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/legal/ads`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/legal/medical-disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    ...articles.map((slug) => ({ url: `${blog}/articles/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
