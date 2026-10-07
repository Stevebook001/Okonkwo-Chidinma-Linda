import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";

const configs: Record<string,{title:string;description:string}> = {
  "www.ocl.it.com": { title:"OCL Health | Pharmacy, Wellness & Health Education", description:"OCL Health — trusted pharmacy, chemistry, wellness and health education, with a growing marketplace and digital health platform." },
  "ocl.it.com": { title:"OCL Health | Pharmacy, Wellness & Health Education", description:"OCL Health — trusted pharmacy, chemistry, wellness and health education, with a growing marketplace and digital health platform." },
  "blogs.ocl.it.com": { title:"OCL Health Blog | Pharmacy, Medicine & Wellness", description:"Health education, pharmacy insights, medicine information and practical wellness content from OCL Health." },
  "developers.ocl.it.com": { title:"OCL Developers | Build with OCL", description:"Developer APIs, webhooks, SDKs and integration tools for approved OCL Health platform services." },
  "docs.ocl.it.com": { title:"OCL Docs | Developer Documentation", description:"OCL API documentation, quickstarts, authentication, webhooks, SDK guides and integration references." },
  "admin.ocl.it.com": { title:"OCL Admin | Platform Operations", description:"OCL Health administration and team operations workspace." },
  "account.ocl.it.com": { title:"OCL Account | Your Health Platform Dashboard", description:"Manage your OCL profile, orders, saved products, support and future health tools." },
  "shop.ocl.it.com": { title:"OCL Shop | Health Products", description:"Explore health products, product information, current pricing and availability through OCL Health." },
  "api.ocl.it.com": { title:"OCL API | Programmable Health Platform", description:"Authenticated OCL APIs for approved product, content and platform integrations." },
  "status.ocl.it.com": { title:"OCL Status | Service Health", description:"Current OCL platform and API service status." },
  "support.ocl.it.com": { title:"OCL Support | Help & Product Enquiries", description:"OCL Health support for customers, product enquiries and platform assistance." }
};

export async function generateMetadata(): Promise<Metadata> {
  const host=(await headers()).get("host")?.split(":")[0] ?? "www.ocl.it.com";
  const c=configs[host] ?? configs["www.ocl.it.com"];
  return {
    metadataBase:new URL("https://"+host),
    title:c.title,
    description:c.description,
    applicationName:"OCL Health",
    keywords:["OCL Health","pharmacy","health","wellness","medicine education","chemistry"],
    openGraph:{title:c.title,description:c.description,url:"https://"+host,siteName:"OCL Health",type:"website",images:[{url:"/opengraph-image",width:1200,height:630,alt:c.title}]},
    twitter:{card:"summary_large_image",title:c.title,description:c.description,images:["/opengraph-image"]},
    icons:{icon:"/icon.svg",apple:"/icon.svg"}
  };
}

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
