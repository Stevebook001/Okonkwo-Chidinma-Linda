import type { ReactNode } from "react";

const articles: Record<string, { title: string; description: string; cover: string }> = {
  "read-a-medicine-label": {
    title: "How to read a medicine label safely",
    description: "A practical guide to understanding active ingredients, strengths, directions, warnings, storage and expiry information on medicine labels.",
    cover: "/blog/medicine-label.svg",
  },
  "questions-for-your-pharmacist": {
    title: "Questions to ask your pharmacist before using a medicine",
    description: "A detailed checklist for discussing purpose, instructions, interactions, side effects, storage, affordability and follow-up with a pharmacist.",
    cover: "/blog/pharmacist-conversation.svg",
  },
  "sustainable-nutrition-habits": {
    title: "Building simple, sustainable nutrition habits",
    description: "Practical, flexible ideas for balanced meals, hydration, food planning, affordability and sustainable everyday nutrition habits.",
    cover: "/blog/nutrition-habits.svg",
  },
};

export default async function ArticleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  const structuredData = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: [`https://blogs.ocl.it.com${article.cover}`],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://blogs.ocl.it.com/articles/${slug}`,
        },
        author: {
          "@type": "Organization",
          name: "OCL Health Editorial",
        },
        publisher: {
          "@type": "Organization",
          name: "OCL Health",
          url: "https://ocl.it.com",
          logo: {
            "@type": "ImageObject",
            url: "https://ocl.it.com/icon.svg",
          },
        },
        inLanguage: "en",
      }
    : null;

  return (
    <>
      {children}
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </>
  );
}
