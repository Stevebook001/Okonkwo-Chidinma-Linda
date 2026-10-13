import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import AnalyticsTracker from "./AnalyticsTracker";

const configs: Record<string,{title:string;description:string}> = {
  "www.ocl.it.com": { title:"OCL Health | Pharmacy, Wellness & Health Education", description:"OCL Health — trusted pharmacy, chemistry, wellness and health education, with a growing marketplace and digital health platform." },
  "ocl.it.com": { title:"OCL Health | Pharmacy, Wellness & Health Education", description:"OCL Health — trusted pharmacy, chemistry, wellness and health education, with a growing marketplace and digital health platform." },
  "blogs.ocl.it.com": { title:"OCL Health Blog | Pharmacy, Medicine & Wellness", description:"Health education, pharmacy insights, medicine information and practical wellness content from OCL Health." },
  "developers.ocl.it.com": { title:"OCL Developers | Build with OCL", description:"Developer APIs, webhooks, SDKs and integration tools for approved OCL Health platform services." },
  "docs.ocl.it.com": { title:"OCL Docs | Developer Documentation", description:"OCL API documentation, quickstarts, authentication, webhooks, SDK guides and integration references." },
  "admin.ocl.it.com": { title:"OCL Admin | Platform Operations", description:"Private OCL Health administration and team operations workspace." },
  "account.ocl.it.com": { title:"OCL Account | Your Health Platform Dashboard", description:"Private customer workspace for managing your OCL profile, orders, saved products, support and preferences." },
  "shop.ocl.it.com": { title:"OCL Shop | Health Products", description:"Explore health product information and catalogue availability through OCL Health, subject to verification and compliance review." },
  "api.ocl.it.com": { title:"OCL API | Programmable Health Platform", description:"Authenticated OCL APIs for approved product, content and platform integrations." },
  "status.ocl.it.com": { title:"OCL Status | Service Health", description:"OCL platform service information and availability updates." },
  "support.ocl.it.com": { title:"OCL Support | Help & Product Enquiries", description:"OCL Health support for customer questions, product enquiries and platform assistance." }
};

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host")?.split(":")[0]?.toLowerCase() ?? "www.ocl.it.com";
  const c = configs[host] ?? configs["www.ocl.it.com"];
  const privateHost = ["admin.ocl.it.com", "account.ocl.it.com", "api.ocl.it.com"].includes(host);
  const canonical = "https://" + host;
  return {
    metadataBase: new URL(canonical),
    title: c.title,
    description: c.description,
    applicationName: "OCL Health",
    keywords: ["OCL Health", "pharmacy", "health", "wellness", "medicine education", "chemistry"],
    alternates: { canonical },
    openGraph: {
      title: c.title,
      description: c.description,
      url: canonical,
      siteName: "OCL Health",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: c.title }]
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images: ["/opengraph-image"] },
    robots: privateHost ? { index: false, follow: false, noarchive: true } : undefined,
    icons: { icon: "/icon.svg", apple: "/icon.svg" }
  };
}

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><AnalyticsTracker />{children}</body></html>;
}
