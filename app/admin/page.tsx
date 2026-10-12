import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OCL Admin Control Center",
  description: "Private OCL Health administration workspace for product compliance, publishing and operations.",
  robots: { index: false, follow: false, noarchive: true },
  openGraph: { title: "OCL Admin Control Center", description: "Private OCL Health administration workspace.", url: "https://admin.ocl.it.com/admin", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "OCL Admin Control Center" }] },
  twitter: { card: "summary_large_image", title: "OCL Admin Control Center", description: "Private OCL Health administration workspace.", images: ["/opengraph-image"] }
};

const modules = [
  { title: "Product catalogue", status: "Database pending", detail: "Manage verified product images, descriptions, current prices, stock and seller documents.", href: "https://shop.ocl.it.com", action: "Preview shop" },
  { title: "Health publishing", status: "Static guides live", detail: "Review long-form articles and prepare the database-backed draft, review and publish workflow.", href: "https://blogs.ocl.it.com", action: "Open health blog" },
  { title: "Kedi compliance", status: "Approval required", detail: "Do not publish Kedi-branded listings until site-specific written permission, current product records and approved claims are on file.", href: "https://ocl.it.com/legal/kedi-seller-policy", action: "Read seller policy" },
  { title: "Refunds and orders", status: "Checkout disabled", detail: "Order records, refunds and delivery tracking require a connected database and verified payment workflow.", href: "https://ocl.it.com/legal/refund", action: "Read refund policy" },
  { title: "Customer accounts", status: "Database pending", detail: "Sign-up and sign-in screens are coded, but live authentication requires the dedicated OCL Supabase project and Auth settings.", href: "https://account.ocl.it.com/auth/sign-up", action: "Preview account" },
  { title: "Email and newsletter", status: "Sender verified", detail: "Resend sending DNS is verified and the sender key is stored in Vercel. Newsletter storage and confirmation still need Supabase.", href: "https://ocl.it.com/#contact", action: "Open contact section" }
];

export default function Admin() {
  return <main className="adminDashboard">
    <aside className="adminSidebar"><a className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a><span className="adminSidebarLabel">CONTROL CENTER</span><a className="active" href="#overview">Overview</a><a href="#modules">Platform modules</a><a href="https://blogs.ocl.it.com">Health blog ↗</a><a href="https://shop.ocl.it.com">Marketplace ↗</a><a href="https://ocl.it.com/legal/drug-policy">Drug policy ↗</a><a href="https://ocl.it.com/legal/kedi-seller-policy">Kedi policy ↗</a><div className="adminSidebarFoot">Private workspace<br/>Access protected</div></aside>
    <div className="adminMain">
      <header className="adminTopbar"><div><span className="eyebrow">OCL HEALTH OPERATIONS</span><h1>Control center</h1></div><a className="secondary" href="https://ocl.it.com">View public site ↗</a></header>
      <section id="overview" className="adminWelcome"><div><span className="eyebrow">RELEASE READINESS</span><h2>Build safely. Launch confidently.</h2><p>The public website and domain structure are live. Keep sales and regulated-product publishing gated until the database, seller checks and checkout controls are verified.</p></div><span className="adminPrivatePill"><span/> PRIVATE ADMIN</span></section>
      <section className="adminReadiness">
        <article><span className="adminStatusDot good"/> <span>Domain and Vercel</span><strong>Connected</strong><small>Custom domains verified in project</small></article>
        <article><span className="adminStatusDot good"/> <span>Resend sender</span><strong>Verified</strong><small>Outgoing email authentication ready</small></article>
        <article><span className="adminStatusDot pending"/> <span>Database and Auth</span><strong>Not connected</strong><small>Dedicated Supabase project required</small></article>
        <article><span className="adminStatusDot pending"/> <span>Commerce</span><strong>Disabled</strong><small>Do not accept orders yet</small></article>
      </section>
      <section id="modules" className="adminModulesHead"><div><span className="eyebrow">WORKSPACES</span><h2>Platform modules</h2><p>Each module shows its real integration status; no demo sales or fake analytics are displayed.</p></div></section>
      <section className="adminModuleGrid">{modules.map((module, index) => <article className="adminModule" key={module.title}><div className="adminModuleTop"><span className="adminModuleNumber">{String(index+1).padStart(2,"0")}</span><span className={module.status === "Sender verified" || module.status === "Static guides live" ? "adminTag goodTag" : "adminTag pendingTag"}>{module.status}</span></div><h3>{module.title}</h3><p>{module.detail}</p><Link href={module.href}>{module.action} →</Link></article>)}</section>
      <section className="adminCompliance"><div><span className="eyebrow">BEFORE SELLING MEDICINES</span><h2>Compliance checklist</h2><p>Every regulated listing needs the correct product, supplier, registration and advertising evidence before it can be approved.</p></div><ul><li>Confirm supplier and product authenticity</li><li>Verify applicable NAFDAC registration and approved claims</li><li>Confirm Kedi website and trademark permission where applicable</li><li>Apply Kedi retail pricing and written promotion rules</li><li>Keep prescription-only and controlled medicines blocked unless a lawful workflow is approved</li></ul><div className="adminComplianceLinks"><Link href="https://ocl.it.com/legal/drug-policy">Drug policy</Link><Link href="https://ocl.it.com/legal/kedi-seller-policy">Kedi seller policy</Link><Link href="https://ocl.it.com/legal/refund">Refund policy</Link></div></section>
      <footer className="adminFooter">OCL Health • Private administration • No customer or sales metrics are shown until connected data is available.</footer>
    </div>
  </main>;
}
