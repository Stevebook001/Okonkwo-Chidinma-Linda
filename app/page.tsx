import { headers } from "next/headers";

const products = [
  ["Vitamin C 1000mg", "Vitamins & Supplements"],
  ["Paracetamol", "Pain & Fever"],
  ["Antacid Suspension", "Digestive Health"],
];

const articles = [
  ["How to read a medicine label safely", "Medicine education"],
  ["What pharmacists want you to know about self-medication", "Pharmacy tips"],
  ["Simple nutrition habits that support everyday wellness", "Nutrition"],
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
      <header className="nav">
        <a className="brand" href="/"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a>
        <nav>
          <a href="#about">About</a><a href="#marketplace">Marketplace</a><a href="#blog">Health Blog</a>
          <a href="https://developers.ocl.it.com">Developers</a><a className="navButton" href="https://account.ocl.it.com">Sign in</a>
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
        <div className="productGrid">{products.map(([name,category]) => <article className="product" key={name}><div className="productImage"><span>OCL HEALTH</span></div><div className="productBody"><span>{category}</span><h3>{name}</h3><p>Product information, intended use, key details and safety notes will be managed from the future OCL catalogue.</p><strong>Price coming soon</strong><small>Admin-managed pricing</small></div></article>)}</div>
        <p className="notice">Product prices and availability can change. The production marketplace will show current information and a last-updated timestamp before purchase.</p>
      </section>

      <section id="blog" className="section">
        <div className="sectionHead"><div><span className="eyebrow">HEALTH BLOG</span><h2>Content that helps people find OCL.</h2></div><a href="https://blogs.ocl.it.com">Open blog →</a></div>
        <div className="topicRow">{["Pharmacy tips","Medicine education","Women’s health","Men’s health","Nutrition","Wellness"].map(t => <span key={t}>{t}</span>)}</div>
        <div className="articleGrid">{articles.map(([title,cat]) => <article className="article" key={title}><div className="articleImage"></div><span>{cat}</span><h3>{title}</h3><p>Publishing tools will let the OCL team create, edit, schedule and optimise articles.</p><a href="https://blogs.ocl.it.com">Read blog →</a></article>)}</div>
      </section>

      <section className="developerStrip"><div><span className="eyebrow">FOR BUILDERS</span><h2>OCL can become a platform developers can build on.</h2><p>APIs for approved product, content and platform services can eventually power apps and integrations without exposing customer health records.</p></div><a className="secondary" href="https://developers.ocl.it.com">Explore OCL Developers →</a></section>

      <section className="newsletter"><div><span className="eyebrow">OCL NEWSLETTER</span><h2>Useful health knowledge, without the noise.</h2><p>Newsletter subscriptions will be connected to the production email system during the backend phase.</p></div><form><input type="email" placeholder="Your email address" aria-label="Email address"/><button type="button">Join</button></form></section>

      <section className="contact section"><span className="eyebrow">CONTACT</span><h2>OCL is being built for a real healthcare team.</h2><p>Questions, product enquiries and partnership requests will eventually flow through the OCL support system.</p><a className="primary" href="mailto:hello@ocl.it.com">Contact OCL Health</a></section>

      <footer><div className="footerTop"><div><a className="brand" href="/"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a><p>Pharmacy, chemistry, wellness and health education.</p></div><div><b>Explore</b><a href="#marketplace">Marketplace</a><a href="https://blogs.ocl.it.com">Health Blog</a><a href="https://developers.ocl.it.com">Developers</a></div><div><b>Platform</b><a href="https://account.ocl.it.com">Account</a><a href="https://admin.ocl.it.com">Admin</a><a href="https://docs.ocl.it.com">Docs</a></div><div><b>Legal</b><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a><a href="/legal/refund">Refund policy</a></div></div><div className="footerBottom">© 2026 OCL Health • Built with care • Health information is educational and not a substitute for professional medical advice.</div></footer>
      <button className="aiWidget" type="button" title="OCL AI is being built">✦ <span>OCL AI</span></button>
    </>
  );
}

function Portal({ host }: { host: string }) {
  const configs: Record<string,{title:string;description:string;eyebrow:string}> = {
    "blogs.ocl.it.com": { eyebrow:"OCL PUBLISHING", title:"Health knowledge worth finding.", description:"The OCL Health Blog will be the publishing home for pharmacy, chemistry, medicine education, wellness and practical health content." },
    "developers.ocl.it.com": { eyebrow:"OCL DEVELOPER PLATFORM", title:"Build with OCL.", description:"Developer APIs, authentication, webhooks, SDKs, sandbox access and integration guides for approved OCL services — designed without exposing private customer health records." },
    "docs.ocl.it.com": { eyebrow:"OCL DOCUMENTATION", title:"Documentation for builders.", description:"API references, quickstarts, authentication, webhooks, SDK guides, examples and platform changelogs will live here." },
    "admin.ocl.it.com": { eyebrow:"OCL OPERATIONS", title:"Control the platform.", description:"A protected team workspace for products, prices, orders, content, customers, analytics, advertising and site configuration." },
    "account.ocl.it.com": { eyebrow:"OCL ACCOUNT", title:"Your OCL dashboard.", description:"Secure customer accounts will bring together profiles, carts, orders, receipts, saved products, support and approved health tools." },
    "shop.ocl.it.com": { eyebrow:"OCL MARKETPLACE", title:"Health products, in one place.", description:"The production marketplace will connect product information, current pricing, availability, carts and secure checkout." },
    "api.ocl.it.com": { eyebrow:"OCL API", title:"A programmable health platform.", description:"The future OCL API gateway will provide authenticated access to approved product, content and platform capabilities." },
    "status.ocl.it.com": { eyebrow:"OCL STATUS", title:"Service health and availability.", description:"A public status page for OCL services, APIs and future platform components." },
    "support.ocl.it.com": { eyebrow:"OCL SUPPORT", title:"Help when you need it.", description:"Customer support, product enquiries, order assistance and platform help will be brought together here." }
  };
  const c=configs[host] ?? configs["docs.ocl.it.com"];
  return <><header className="portalNav"><a className="brand" href="https://www.ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a><a href="https://www.ocl.it.com">Main site →</a></header><HostBanner {...c}/><section className="portalGrid"><article><span>PHASE 1</span><h2>Foundation is live.</h2><p>The domain, Vercel deployment, responsive interface, metadata architecture and platform structure are being shipped first.</p></article><article><span>PHASE 2</span><h2>Real systems next.</h2><p>Database, authentication, products, orders, publishing, email, payments and role-based administration will be connected as the platform progresses.</p></article><article><span>SAFETY</span><h2>Built responsibly.</h2><p>Health data, payments and regulated products will use appropriate access controls and professional/regulatory review before production use.</p></article></section><footer><div className="footerBottom">OCL Health • {host} • © 2026</div></footer></>;
}

export default async function Home() {
  const host = (await headers()).get("host")?.split(":")[0] ?? "www.ocl.it.com";
  if (host !== "ocl.it.com" && host !== "www.ocl.it.com") return <Portal host={host}/>;
  return <main><MainSite /></main>;
}
