import { headers } from "next/headers";
import ContactForm from "@/app/ContactForm";
import NewsletterForm from "@/app/NewsletterForm";
import AdSenseLoader from "@/app/AdSenseLoader";
import DocsHome from "@/app/docs/DocsHome";
import ShopPortal from "@/app/ShopPortal";
import { createClient } from "@supabase/supabase-js";

const products = [
  ["Vitamin C 1000mg", "Vitamins & Supplements", "vitamin-c-1000mg", "/products/vitamin-c.svg"],
  ["Paracetamol", "Medicine catalogue", "paracetamol", "/products/paracetamol.svg"],
  ["Antacid Suspension", "Digestive Health", "antacid-suspension", "/products/antacid.svg"],
];

const articles = [
  ["How to read a medicine label safely", "Medicine education", "read-a-medicine-label", "/blog/medicine-label.svg"],
  ["Questions to ask your pharmacist before using a medicine", "Pharmacy tips", "questions-for-your-pharmacist", "/blog/pharmacist-conversation.svg"],
  ["Building simple, sustainable nutrition habits", "Nutrition", "sustainable-nutrition-habits", "/blog/nutrition-habits.svg"],
  ["How to store medicines safely at home", "Medicine safety", "storing-medicines-safely", "/blog/medicine-storage.svg"],
  ["Prepare for a useful pharmacy consultation", "Pharmacy tips", "prepare-for-pharmacist-visit", "/blog/pharmacy-visit.svg"],
  ["How to read a vitamin and supplement label", "Health literacy", "understanding-supplement-labels", "/blog/supplement-label.svg"],
  ["Using over-the-counter medicines more safely", "Medicine education", "safe-use-of-over-the-counter-medicines", "/blog/otc-medicine-safety.svg"],
  ["How to make a useful personal medicine list", "Health literacy", "building-a-personal-medicine-list", "/blog/medicine-list.svg"],
];

function HostBanner({ title, description, eyebrow }: { title: string; description: string; eyebrow: string }) {
  return (
    <section className="portalHero">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

function MainSite() {
  return (
    <>
      <AdSenseLoader clientId={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} />
      <header className="nav">
        <a className="brand" href="/"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a>
        <nav>
          <a href="#about">About</a><a href="#marketplace">Marketplace</a><a href="#blog">Health Blog</a>
          <a href="https://developers.ocl.it.com">Developers</a><a className="navButton" href="https://account.ocl.it.com/auth/sign-in">Sign in</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">PHARMACY • CHEMISTRY • WELLNESS</span>
          <h1>Better health decisions start with <em>better information.</em></h1>
          <p>OCL Health is being built as a trusted digital health platform for practical health education, pharmacy services, product discovery and a growing healthcare community.</p>
          <div className="actions"><a className="primary" href="#marketplace">Explore marketplace</a><a className="secondary" href="#blog">Read health articles →</a></div>
          <small>Educational information does not replace advice, diagnosis or treatment from a qualified healthcare professional.</small>
        </div>
        <div className="heroCard">
          <div className="orbit"><span>✚</span></div>
          <span>OCL HEALTH</span><strong>Trusted. Clear. Human.</strong>
          <div className="miniStats"><div><b>24/7</b><small>Digital resources</small></div><div><b>1</b><small>Growing platform</small></div></div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="sectionIntro"><span className="eyebrow">THE PLATFORM</span><h2>A health platform that can grow with her team.</h2><p>OCL starts with a strong public website and is being architected to become a real marketplace, content system, customer account platform and developer ecosystem.</p></div>
        <div className="featureGrid">
          {[
            ["Health Blog","Publish useful, search-friendly articles across pharmacy, chemistry, wellness and everyday health."],
            ["Product Marketplace","Show product images, descriptions, availability and admin-controlled current pricing."],
            ["Customer Accounts","Give customers secure profiles, carts, orders, receipts, saved products and support."],
            ["Team Dashboard","Let authorised team members manage products, prices, blogs, enquiries and platform settings."],
            ["Developer Platform","Expose carefully designed APIs, documentation, webhooks and sandbox tools without exposing private health data."],
            ["OCL AI","A future assistant for product discovery, platform support, content navigation and developer documentation."]
          ].map(([title,text]) => <article className="feature" key={title}><div className="featureIcon">✓</div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section id="marketplace" className="section tinted">
        <div className="sectionHead"><div><span className="eyebrow">MARKETPLACE</span><h2>Health products, explained clearly.</h2></div><a href="https://shop.ocl.it.com">Open shop →</a></div>
        <div className="productGrid">{products.map(([name,category,slug,image]) => <article className="product" key={name}><a className="productImage" href={"https://shop.ocl.it.com/products/"+slug}><img src={image} alt={"Illustrative catalogue image for "+name} loading="lazy"/><span>VIEW DETAILS</span></a><div className="productBody"><span>{category}</span><h3><a href={"/products/"+slug}>{name}</a></h3><p>Catalogue preview only. Product details and regulatory status must be verified before sale.</p><strong>Not available to order yet</strong><small>Compliance review required</small></div></article>)}</div>
        <p className="notice">Product prices and availability can change. The production marketplace will show current information and a last-updated timestamp before purchase.</p>
      </section>

      <section id="blog" className="section">
        <div className="sectionHead"><div><span className="eyebrow">HEALTH BLOG</span><h2>Content that helps people find OCL.</h2></div><a href="https://blogs.ocl.it.com">Open blog →</a></div>
        <div className="topicRow">{["Pharmacy tips","Medicine education","Women’s health","Men’s health","Nutrition","Wellness"].map(t => <span key={t}>{t}</span>)}</div>
        <div className="articleGrid">{articles.map(([title,cat,slug,image]) => <article className="article" key={title}><div className="articleImage"><img src={image} alt={title} loading="lazy"/></div><span>{cat}</span><h3>{title}</h3><p>Practical educational guidance with a clear health-safety disclaimer.</p><a href={"https://blogs.ocl.it.com/articles/"+slug}>Read full guide →</a></article>)}</div>
      </section>

      <section className="developerStrip"><div><span className="eyebrow">FOR BUILDERS</span><h2>OCL can become a platform developers can build on.</h2><p>APIs for approved product, content and platform services can eventually power apps and integrations without exposing customer health records.</p></div><a className="secondary" href="https://developers.ocl.it.com">Explore OCL Developers →</a></section>

      <section className="newsletter"><div><span className="eyebrow">OCL NEWSLETTER</span><h2>Useful health knowledge, without the noise.</h2><p>Newsletter subscriptions will be connected to the production email system during the backend phase.</p></div><NewsletterForm/></section>

      <section id="contact" className="contact section"><span className="eyebrow">CONTACT</span><h2>OCL is being built for a real healthcare team.</h2><p>Questions, product enquiries and partnership requests will eventually flow through the OCL support system.</p><ContactForm/></section>

      <footer><div className="footerTop"><div><a className="brand" href="/"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a><p>Pharmacy, chemistry, wellness and health education.</p></div><div><b>Explore</b><a href="#marketplace">Marketplace</a><a href="https://blogs.ocl.it.com">Health Blog</a><a href="https://developers.ocl.it.com">Developers</a></div><div><b>Platform</b><a href="https://account.ocl.it.com">Account</a><a href="https://admin.ocl.it.com">Admin</a><a href="https://docs.ocl.it.com">Docs</a></div><div><b>Legal</b><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a><a href="/legal/refund">Refund policy</a><a href="/legal/drug-policy">Drug policy</a><a href="/legal/kedi-seller-policy">Kedi seller policy</a></div></div><div className="footerBottom">© 2026 OCL Health • Built with care • Health information is educational and not a substitute for professional medical advice. <a href="https://github.com/Stevebook001/Okonkwo-Chidinma-Linda" target="_blank" rel="noreferrer">GitHub source ↗</a></div></footer>
      <button className="aiWidget" type="button" title="OCL AI is being built">✦ <span>OCL AI</span></button>
    </>
  );
}

async function BlogPortal({ pageNumber = 1 }: { pageNumber?: number }) {
  let databasePosts: { title: string; category: string; slug: string; description: string; cover_image_url: string }[] = [];
  const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const dbKey = process.env.SUPABASE_SECRET_KEY;
  if (dbUrl && dbKey) {
    const db = createClient(dbUrl, dbKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data } = await db.from("posts").select("title,category,slug,description,cover_image_url").eq("status", "published").order("published_at", { ascending: false }).limit(30);
    databasePosts = (data ?? []) as typeof databasePosts;
  }
  const posts = [
    { category: "MEDICINE EDUCATION", image: "/blog/medicine-label.svg", title: "How to read a medicine label safely", excerpt: "Learn where to look for the active ingredient, strength, directions, warnings, expiry date and storage guidance.", slug: "read-a-medicine-label" },
    { category: "PHARMACY TIPS", image: "/blog/pharmacist-conversation.svg", title: "Questions to ask your pharmacist before using a medicine", excerpt: "A practical checklist to help you understand what a medicine is for, how to use it, and when to seek professional advice.", slug: "questions-for-your-pharmacist" },
    { category: "EVERYDAY WELLNESS", image: "/blog/nutrition-habits.svg", title: "Building simple, sustainable nutrition habits", excerpt: "Small, realistic ways to make balanced food choices part of everyday life without chasing miracle claims.", slug: "sustainable-nutrition-habits" },
    { category: "MEDICINE SAFETY", image: "/blog/medicine-storage.svg", title: "How to store medicines safely at home", excerpt: "Protect medicine quality and reduce accidental use with practical storage habits.", slug: "storing-medicines-safely" },
    { category: "PHARMACY TIPS", image: "/blog/pharmacy-visit.svg", title: "Prepare for a useful pharmacy consultation", excerpt: "Prepare your questions and medicine list for a clearer conversation with a pharmacist.", slug: "prepare-for-pharmacist-visit" },
    { category: "HEALTH LITERACY", image: "/blog/supplement-label.svg", title: "How to read a vitamin and supplement label", excerpt: "Understand ingredients, serving sizes, warnings and marketing claims.", slug: "understanding-supplement-labels" },
    { category: "MEDICINE EDUCATION", image: "/blog/otc-medicine-safety.svg", title: "Using over-the-counter medicines more safely", excerpt: "Check ingredients, directions and warnings before using non-prescription medicines.", slug: "safe-use-of-over-the-counter-medicines" },
    { category: "HEALTH LITERACY", image: "/blog/medicine-list.svg", title: "How to make a useful personal medicine list", excerpt: "Keep a current record to support clearer healthcare conversations.", slug: "building-a-personal-medicine-list" },
  ];
  const combinedPosts = [...databasePosts.map(p => ({ category: p.category.toUpperCase(), image: p.cover_image_url, title: p.title, excerpt: p.description, slug: p.slug, databasePost: true })), ...posts.map(p => ({ ...p, databasePost: false }))];
  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(combinedPosts.length / pageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(pageNumber) || 1), pageCount);
  const visiblePosts = combinedPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return (
    <>
      <AdSenseLoader clientId={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} />
      <header className="nav">
        <a className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a>
        <nav><a href="https://ocl.it.com/#about">About OCL</a><a href="https://shop.ocl.it.com">Marketplace</a><a className="navButton" href="https://ocl.it.com/#contact">Contact</a></nav>
      </header>
      <section className="blogHero">
        <div><span className="eyebrow">THE OCL HEALTH JOURNAL</span><h1>Clear health information.<br/><em>More confident questions.</em></h1><p>Accessible educational articles about pharmacy, medicine labels, wellness and how to have more informed conversations with qualified healthcare professionals.</p><div className="actions"><a className="primary" href="#latest">Explore articles ↓</a><a className="secondary" href="https://ocl.it.com">Visit OCL Health</a></div></div>
        <aside className="blogHeroCard"><span className="blogBadge">OCL EDITORIAL</span><div className="blogIllustration">✚</div><h2>Knowledge is a good place to start.</h2><p>Evidence-aware, practical education — never a substitute for personal medical advice.</p></aside>
      </section>
      <section className="section" id="latest">
        <div className="sectionHead"><div><span className="eyebrow">LATEST GUIDES</span><h2>Start with the essentials.</h2></div><span className="blogCount">{combinedPosts.length} editorial guides · Page {currentPage} of {pageCount}</span></div>
        <div className="articleGrid">{visiblePosts.map((post, index) => <article className="article blogArticle" key={post.slug}><div className="articleImage blogArtImage"><img src={post.image} alt={post.title} loading="lazy" /><span>0{index + 1}</span></div><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><a href={post.databasePost ? `/posts/${post.slug}` : `/articles/${post.slug}`}>Read full article ↑</a></article>)}</div>
        <nav className="blogPagination" aria-label="Blog pages">{currentPage > 1 && <a href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`} aria-label="Previous page">← Previous</a>}{Array.from({length: pageCount}, (_, i) => i + 1).map(n => <a key={n} href={n === 1 ? "/" : `/?page=${n}`} aria-current={n === currentPage ? "page" : undefined} className={n === currentPage ? "current" : ""}>Page {n}</a>)}{currentPage < pageCount && <a href={`/?page=${currentPage + 1}`} aria-label="Next page">Next →</a>}</nav>
      </section>
      <section className="blogTopics"><span className="eyebrow">EXPLORE BY TOPIC</span><div className="topicRow">{["Medicine education","Pharmacy conversations","Nutrition","Everyday wellness","Product safety","Health literacy"].map(topic => <span key={topic}>{topic}</span>)}</div></section>
      <section className="blogDisclaimer"><strong>A note on health information</strong><p>OCL articles are for general education only. They do not diagnose conditions, recommend an individual treatment plan, or replace advice from a qualified pharmacist, doctor or other licensed healthcare professional. For an urgent or severe symptom, seek appropriate local medical care.</p></section>
      <footer><div className="footerTop"><div><a className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a><p>Pharmacy, chemistry, wellness and practical health education.</p></div><div><b>Explore</b><a href="#latest">Latest guides</a><a href="https://shop.ocl.it.com">Marketplace</a><a href="https://developers.ocl.it.com">Developers</a></div><div><b>Platform</b><a href="https://admin.ocl.it.com">Admin portal</a><a href="https://docs.ocl.it.com">Documentation</a><a href="https://support.ocl.it.com">Support</a></div><div><b>Policies</b><a href="https://ocl.it.com/legal/privacy">Privacy</a><a href="https://ocl.it.com/legal/terms">Terms</a><a href="https://ocl.it.com/legal/medical-disclaimer">Medical disclaimer</a><a href="https://ocl.it.com/legal/refund">Refund policy</a><a href="https://ocl.it.com/legal/drug-policy">Drug policy</a><a href="https://ocl.it.com/legal/kedi-seller-policy">Kedi seller policy</a></div></div><div className="footerBottom">© 2026 OCL Health • Educational content, not personal medical advice.</div></footer>
    </>
  );
}

function Portal({ host, pageNumber = 1 }: { host: string; pageNumber?: number }) {
  if (host === "blogs.ocl.it.com") return <BlogPortal pageNumber={pageNumber} />;
  if (host === "shop.ocl.it.com") return <ShopPortal />;
  const configs: Record<string,{title:string;description:string;eyebrow:string}> = {
    "blogs.ocl.it.com": { eyebrow:"OCL PUBLISHING", title:"Health knowledge worth finding.", description:"The OCL Health Blog will be the publishing home for pharmacy, chemistry, medicine education, wellness and practical health content." },
    "developers.ocl.it.com": { eyebrow:"OCL DEVELOPER PLATFORM", title:"Build with OCL.", description:"Developer APIs, authentication, webhooks, SDKs, sandbox access and integration guides for approved OCL services — designed without exposing private customer health records." },
    "docs.ocl.it.com": { eyebrow:"OCL DOCUMENTATION", title:"Documentation for builders.", description:"API references, quickstarts, authentication, webhooks, SDK guides, examples and platform changelogs will live here." },
    "admin.ocl.it.com": { eyebrow:"OCL OPERATIONS", title:"Control the platform.", description:"A protected team workspace for products, prices, orders, content, customers, analytics, advertising and site configuration." },
    "account.ocl.it.com": { eyebrow:"OCL ACCOUNT", title:"Your OCL dashboard.", description:"Secure customer accounts will bring together profiles, carts, orders, receipts, saved products, support and approved health tools." },
    "shop.ocl.it.com": { eyebrow:"OCL MARKETPLACE", title:"Health products, in one place.", description:"The production marketplace will connect product information, current pricing, availability, carts and secure checkout." },
    "api.ocl.it.com": { eyebrow:"OCL API", title:"A programmable health platform.", description:"The future OCL API gateway will provide authenticated access to approved product, content and platform capabilities." },
    "status.ocl.it.com": { eyebrow:"OCL STATUS", title:"Service health and availability.", description:"A public status page for OCL services, APIs and future platform components." },
    "support.ocl.it.com": { eyebrow:"OCL SUPPORT", title:"Help when you need it.", description:"Customer support, product enquiries, order assistance and platform help will be brought together here." },
    "builder.ocl.it.com": { eyebrow:"OCL BUILDER", title:"Build your next idea with OCL.", description:"A planned workspace for creating websites and digital experiences. Builder publishing, billing and project storage are not enabled yet." }
  };
  const c=configs[host] ?? configs["docs.ocl.it.com"];
  return <><header className="portalNav"><a className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a><a href="https://ocl.it.com">Main site →</a></header><HostBanner {...c}/>{host === "account.ocl.it.com" && <section className="portalActions"><a className="primary" href="/auth/sign-in">Sign in securely</a><a className="secondary" href="/auth/sign-up">Create an account</a></section>}{host === "shop.ocl.it.com" && <section className="portalActions"><a className="primary" href="/catalog">Browse verified catalogue</a><span className="privateNotice">Only approved catalogue items appear here. Drafts remain private until compliance review.</span></section>}{host === "support.ocl.it.com" && <section className="portalActions"><a className="primary" href="https://ocl.it.com/#contact">Send an enquiry</a><a className="secondary" href="mailto:me.ocl.it.com@gmail.com">Email OCL support</a></section>}{host === "admin.ocl.it.com" && <section className="portalActions"><span className="privateNotice">Private admin access verified. Product publishing, pricing and order tools still require the dedicated database connection.</span><a className="secondary" href="https://ocl.it.com/legal/drug-policy">Review drug policy</a><a className="secondary" href="https://ocl.it.com/legal/kedi-seller-policy">Review Kedi seller policy</a></section>}<section className="portalGrid"><article><span>PHASE 1</span><h2>Foundation is live.</h2><p>The domain, responsive interface, portal metadata and content structure are in place.</p></article><article><span>PHASE 2</span><h2>Connect real systems.</h2><p>Supabase authentication, product inventory, orders, publishing, email and role-based workflows require the dedicated database and environment settings.</p></article><article><span>SAFETY</span><h2>Compliance before checkout.</h2><p>Health data, payments and regulated products remain gated until access controls, seller authority and professional/regulatory checks are complete.</p></article></section><footer><div className="footerBottom">OCL Health • {host} • © 2026 • <a href="https://ocl.it.com/legal/privacy">Privacy</a> • <a href="https://ocl.it.com/legal/refund">Refunds</a> • <a href="https://ocl.it.com/legal/drug-policy">Drug policy</a></div></footer></>;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const host = (await headers()).get("host")?.split(":")[0] ?? "www.ocl.it.com";
  const params = await searchParams;
  const pageNumber = Number.parseInt(params?.page ?? "1", 10) || 1;
  if (host === "docs.ocl.it.com") return <DocsHome />;
  if (host !== "ocl.it.com" && host !== "www.ocl.it.com") return <Portal host={host} pageNumber={pageNumber}/>;
  return <main><MainSite /></main>;
}
