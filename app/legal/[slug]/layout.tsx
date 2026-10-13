import type { ReactNode } from "react";

const policies: Record<string, { title: string; description: string }> = {
  privacy: {
    title: "Privacy Policy",
    description: "How OCL Health handles account, order, support, newsletter and website information.",
  },
  terms: {
    title: "Terms of Service",
    description: "Terms for using OCL Health educational content, product listings, accounts and services.",
  },
  refund: {
    title: "Refund, Cancellation and Returns Policy",
    description: "How OCL Health handles order cancellations, damaged goods, delivery issues and refund requests.",
  },
  "drug-policy": {
    title: "Drug and Regulated Products Policy",
    description: "Safety, listing, prescription, registration, storage and advertising rules for regulated products.",
  },
  "kedi-seller-policy": {
    title: "Kedi Healthcare Seller Compliance Policy",
    description: "Compliance requirements for independent sellers and any Kedi-related listings or promotions.",
  },
  "code-of-conduct": {
    title: "Code of Conduct",
    description: "Community, seller and professional conduct rules for OCL Health.",
  },
  ads: {
    title: "Advertising Policy",
    description: "Rules for transparent advertising, sponsored content and regulated-product promotions on OCL Health.",
  },
  "medical-disclaimer": {
    title: "Medical Disclaimer",
    description: "Important limitations on OCL Health educational articles, product information and health-related features.",
  },
};

export default async function LegalLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policies[slug];
  const structuredData = policy
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${policy.title} | OCL Health`,
        description: policy.description,
        url: `https://ocl.it.com/legal/${slug}`,
        isPartOf: {
          "@type": "WebSite",
          name: "OCL Health",
          url: "https://ocl.it.com",
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
