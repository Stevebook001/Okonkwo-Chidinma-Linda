import type { ReactNode } from "react";

const articles: Record<string, { title: string; description: string; cover: string; keywords: string[] }> = {
  "read-a-medicine-label": {
    title: "How to read a medicine label safely",
    description: "A practical guide to understanding active ingredients, strengths, directions, warnings, storage and expiry information on medicine labels.",
    keywords: ["how to read a medicine label", "active ingredients", "medicine strength", "medicine warnings", "expiry date"],
    cover: "/blog/medicine-label.svg",
  },
  "questions-for-your-pharmacist": {
    title: "Questions to ask your pharmacist before using a medicine",
    description: "A detailed checklist for discussing purpose, instructions, interactions, side effects, storage, affordability and follow-up with a pharmacist.",
    keywords: ["questions to ask a pharmacist", "medicine interactions", "pharmacy consultation", "medicine side effects"],
    cover: "/blog/pharmacist-conversation.svg",
  },
  "sustainable-nutrition-habits": {
    title: "Building simple, sustainable nutrition habits",
    description: "Practical, flexible ideas for balanced meals, hydration, food planning, affordability and sustainable everyday nutrition habits.",
    cover: "/blog/nutrition-habits.svg",
    keywords: ["sustainable nutrition habits", "balanced meals", "hydration", "healthy food planning", "nutrition education"],
  },
  "storing-medicines-safely": {
    title: "How to store medicines safely at home",
    description: "Learn how to read storage instructions, protect medicines from heat and moisture, keep them away from children, and recognise when storage may have affected a product.",
    cover: "/blog/medicine-storage.svg",
    keywords: ["how to store medicines safely", "medicine storage at home", "medicine safety", "medicine expiry date"],
  },
  "prepare-for-pharmacist-visit": {
    title: "Prepare for a useful pharmacy consultation",
    description: "A practical checklist for preparing medicine lists, explaining concerns, asking questions and following up after speaking with a pharmacist.",
    cover: "/blog/pharmacy-visit.svg",
    keywords: ["prepare for pharmacist appointment", "pharmacist consultation questions", "medicine list", "medication review"],
  },
  "understanding-supplement-labels": {
    title: "How to read a vitamin and supplement label",
    description: "Understand ingredient lists, serving sizes, amounts, warnings and marketing claims on vitamin and supplement packaging without assuming natural means safe.",
    cover: "/blog/supplement-label.svg",
    keywords: ["how to read supplement labels", "vitamin label explained", "supplement serving size", "supplement safety"],
  },
  "safe-use-of-over-the-counter-medicines": {
    title: "Using over-the-counter medicines more safely",
    description: "A safety-first guide to checking active ingredients, following package directions, avoiding duplicate medicines and knowing when professional advice is needed.",
    cover: "/blog/otc-medicine-safety.svg",
    keywords: ["over the counter medicine safety", "OTC medicine tips", "active ingredients", "medicine label"],
  },
  "building-a-personal-medicine-list": {
    title: "How to make a useful personal medicine list",
    description: "Learn what to include in a personal medicine list, how to keep it current, and how it can support safer conversations with healthcare professionals.",
    cover: "/blog/medicine-list.svg",
    keywords: ["personal medicine list", "medication list template", "medicine records", "pharmacist medication review"],
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
        keywords: article.keywords.join(", "),
        image: [`https://blogs.ocl.it.com${article.cover}`],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://blogs.ocl.it.com/articles/${slug}`,
        },
        author: {
          "@type": "Organization",
          name: "OCL Health Editorial",
          url: "https://ocl.it.com",
          logo: {
            "@type": "ImageObject",
            url: "https://ocl.it.com/icon.svg",
          },
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
