import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import AdminTools from "@/app/AdminTools";

export const dynamic = "force-dynamic";

type CountResult = { label: string; count: number | null; error?: string };

async function readCount(client: any, table: string, label: string): Promise<CountResult> {
  try {
    const { count, error } = await client.from(table).select("*", { count: "exact", head: true });
    if (error) return { label, count: null, error: error.message };
    return { label, count: count ?? 0 };
  } catch (error) {
    return { label, count: null, error: error instanceof Error ? error.message : "Unknown database error" };
  }
}

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

export default async function Admin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  let databaseConnected = false;
  let databaseMessage = "Missing server-side Supabase configuration";
  let counts: CountResult[] = [];
  let pageViews30d = 0;
  let topPages: { path: string; views: number }[] = [];
  let analyticsError = "";
  let onlineVisitors = 0;
  let onlinePaths: { host: string; current_path: string; last_seen_at: string }[] = [];

  if (supabaseUrl && secretKey) {
    const client = createClient(supabaseUrl, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const tables = [
      ["profiles", "Customer profiles"],
      ["products", "Product records"],
      ["posts", "Blog posts"],
      ["orders", "Orders"],
      ["newsletter_subscribers", "Newsletter subscribers"],
      ["analytics_events", "Tracked site events"],
      ["article_submissions", "Article submissions"],
      ["refund_requests", "Refund requests"],
    ];
    counts = await Promise.all(tables.map(([table, label]) => readCount(client, table, label)));
    const failed = counts.filter((item) => item.error);
    databaseConnected = failed.length === 0;
    databaseMessage = databaseConnected
      ? "Connected • live row counts from OCL Supabase"
      : `Database credentials exist, but ${failed.length} table check(s) failed. Review schema permissions and migrations.`;

    const onlineSince = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count: activeCount } = await client.from("visitor_presence").select("visitor_id", { count: "exact", head: true }).gte("last_seen_at", onlineSince);
    onlineVisitors = activeCount ?? 0;
    const { data: activeRows } = await client.from("visitor_presence").select("host,current_path,last_seen_at").gte("last_seen_at", onlineSince).order("last_seen_at", { ascending: false }).limit(8);
    onlinePaths = (activeRows ?? []) as typeof onlinePaths;
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: events, error } = await client
      .from("analytics_events")
      .select("event_name,page_path,created_at")
      .eq("event_name", "page_view")
      .gte("created_at", since)
      .limit(10000);
    if (error) {
      analyticsError = "Page-view query failed. Check analytics_events schema and service key permissions.";
    } else {
      pageViews30d = events?.length ?? 0;
      const byPath = new Map<string, number>();
      for (const event of events ?? []) {
        const path = typeof event.page_path === "string" ? event.page_path : "/";
        byPath.set(path, (byPath.get(path) ?? 0) + 1);
      }
      topPages = [...byPath.entries()]
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 8);
    }
  }

  const metricValue = (label: string) => counts.find((item) => item.label === label);
  return <main className="adminDashboard">
    <aside className="adminSidebar"><a className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a><span className="adminSidebarLabel">CONTROL CENTER</span><a className="active" href="#overview">Overview</a><a href="#analytics">Analytics</a><a href="#content-tools">Content tools</a><a href="#modules">Platform modules</a><a href="https://blogs.ocl.it.com">Health blog ↗</a><a href="https://shop.ocl.it.com">Marketplace ↗</a><a href="https://docs.ocl.it.com">Docs ↗</a><a href="https://github.com/Stevebook001/Okonkwo-Chidinma-Linda" target="_blank" rel="noreferrer">GitHub source ↗</a><a href="https://ocl.it.com/legal/drug-policy">Drug policy ↗</a><a href="https://ocl.it.com/legal/kedi-seller-policy">Kedi policy ↗</a><div className="adminSidebarFoot">Private workspace<br/>Access protected</div></aside>
    <div className="adminMain">
      <header className="adminTopbar"><div><span className="eyebrow">OCL HEALTH OPERATIONS</span><h1>Control center</h1></div><a className="secondary" href="https://ocl.it.com">View public site ↗</a></header>
      <section id="overview" className="adminWelcome"><div><span className="eyebrow">RELEASE READINESS</span><h2>Build safely. Launch confidently.</h2><p>The public website and domain structure are live. Keep sales and regulated-product publishing gated until the database, seller checks and checkout controls are verified.</p></div><span className="adminPrivatePill"><span/> PRIVATE ADMIN</span></section>
      <section className="adminReadiness">
        <article><span className="adminStatusDot good"/> <span>Domain and Vercel</span><strong>Connected</strong><small>Custom domains verified in project</small></article>
        <article><span className="adminStatusDot good"/> <span>Resend sender</span><strong>Verified</strong><small>Outgoing email authentication ready</small></article>
        <article><span className={databaseConnected ? "adminStatusDot good" : "adminStatusDot pending"}/> <span>Database and Auth</span><strong>{databaseConnected ? "Connected" : secretKey ? "Needs review" : "Key missing"}</strong><small>{databaseMessage}</small></article>
        <article><span className="adminStatusDot pending"/> <span>Commerce</span><strong>Disabled</strong><small>Do not accept orders yet</small></article><article className="adminOnlineCard"><span className="adminStatusDot good"/> <span>Anonymous active visitors · last 5 minutes</span><strong>{onlineVisitors.toLocaleString()}</strong><small>Approximate browser sessions; no names, emails or IP addresses are shown.</small>{onlinePaths.length>0&&<ul className="adminOnlinePaths">{onlinePaths.slice(0,4).map((v,i)=><li key={v.host+v.current_path+i}><span>{v.host}{v.current_path}</span><small>{Math.max(0,Math.round((Date.now()-new Date(v.last_seen_at).getTime())/1000))}s ago</small></li>)}</ul>}</article>
      </section>
      <section className="adminModulesHead" id="analytics">
        <div><span className="eyebrow">LIVE OPERATIONS DATA</span><h2>Analytics and platform health</h2><p>Database totals are queried live on page load. Search, traffic and advertising metrics are only shown when their own provider connections are configured; no sample numbers are invented.</p></div>
      </section>
      <section className="adminReadiness adminAnalyticsGrid">
        {counts.map((item) => <article key={item.label}><span className={item.error ? "adminStatusDot pending" : "adminStatusDot good"}/> <span>{item.label}</span><strong>{item.count === null ? "Unavailable" : item.count.toLocaleString()}</strong><small>{item.error ? "Check database schema and permissions" : "Live database count"}</small></article>)}
        {!secretKey && <article><span className="adminStatusDot pending"/> <span>Database metrics</span><strong>Not connected</strong><small>Add SUPABASE_SECRET_KEY in Vercel</small></article>}
      </section>
      <section className="adminModulesHead">
        <div><span className="eyebrow">FIRST-PARTY ANALYTICS</span><h2>Public page views · last 30 days</h2><p>Counts are collected by OCL's own event endpoint and stored in Supabase. This tracker records paths and referrer hostnames only, not query strings, form entries or raw IP addresses.</p></div>
      </section>
      <section className="adminAnalyticsPanel">
        <article className="adminModule">
          <div className="adminModuleTop"><span className="adminModuleNumber">30D</span><span className={analyticsError ? "adminTag pendingTag" : "adminTag goodTag"}>{analyticsError ? "Needs attention" : "First-party"}</span></div>
          <h3>{analyticsError ? "Page-view metrics unavailable" : pageViews30d.toLocaleString()}</h3>
          <p>{analyticsError || "Recorded public page views during the last 30 days. New tracking begins after the current deployment is live."}</p>
        </article>
        <article className="adminModule">
          <div className="adminModuleTop"><span className="adminModuleNumber">TOP</span><span className="adminTag goodTag">By views</span></div>
          <h3>Most visited paths</h3>
          {topPages.length ? <ol className="adminTopPages">{topPages.map((page) => <li key={page.path}><span>{page.path}</span><strong>{page.views.toLocaleString()}</strong></li>)}</ol> : <p>No page-view events recorded yet. Visit the public website after deployment and this panel will populate with real events.</p>}
        </article>
      </section>
      <section className="adminModulesHead">
        <div><span className="eyebrow">EXTERNAL ANALYTICS</span><h2>Search, traffic and monetisation</h2><p>These links open the provider dashboards. Full in-admin traffic metrics need provider API credentials; connecting a ChatGPT plugin does not automatically expose its credentials to this website.</p></div>
      </section>
      <section className="adminModuleGrid">
        <article className="adminModule"><div className="adminModuleTop"><span className="adminModuleNumber">01</span><span className="adminTag pendingTag">Search Console</span></div><h3>Google Search Console</h3><p>Track clicks, impressions, indexing, search queries and sitemap status. OCL's domain property is connected in the external SEO workspace, but direct website dashboard API access still needs Google OAuth or service-account credentials.</p><a href="https://search.google.com/search-console?resource_id=sc-domain%3Aocl.it.com" target="_blank" rel="noreferrer">Open Search Console ↗</a></article>
        <article className="adminModule"><div className="adminModuleTop"><span className="adminModuleNumber">02</span><span className="adminTag pendingTag">Check setup</span></div><h3>Vercel Web Analytics</h3><p>Page views, routes, referrers, devices and countries. Enable Web Analytics for the Vercel project and configure a server-side Vercel API token before showing metrics here.</p><a href="https://vercel.com/ibiribigbe-ibrahim-akannis-projects/ocl/analytics" target="_blank" rel="noreferrer">Open Vercel Analytics ↗</a></article>
        <article className="adminModule"><div className="adminModuleTop"><span className="adminModuleNumber">03</span><span className="adminTag pendingTag">Credentials needed</span></div><h3>Google Analytics 4</h3><p>Sessions, engaged users, landing pages and conversion events. Requires a GA4 property ID plus server-side Google credentials with read access to that property.</p><a href="https://analytics.google.com/" target="_blank" rel="noreferrer">Open Google Analytics ↗</a></article>
        <article className="adminModule"><div className="adminModuleTop"><span className="adminModuleNumber">04</span><span className="adminTag pendingTag">Credentials needed</span></div><h3>Ahrefs SEO</h3><p>Backlinks, referring domains, keyword visibility and competitor research. The connected Ahrefs workspace can be used for analysis; direct dashboard widgets require a supported API plan and API token.</p><a href="https://app.ahrefs.com/" target="_blank" rel="noreferrer">Open Ahrefs ↗</a></article>
        <article className="adminModule"><div className="adminModuleTop"><span className="adminModuleNumber">05</span><span className="adminTag pendingTag">Not approved yet</span></div><h3>Google AdSense</h3><p>Revenue, impressions, RPM and ad status are available only after publisher approval and linking the approved publisher account. No ad code or revenue claims are added before approval.</p><a href="https://adsense.google.com/" target="_blank" rel="noreferrer">Open AdSense ↗</a></article>
      </section>
      <AdminTools />
      <section id="modules" className="adminModulesHead"><div><span className="eyebrow">WORKSPACES</span><h2>Platform modules</h2><p>Each module shows its real integration status; no demo sales or fake analytics are displayed.</p></div></section>
      <section className="adminModuleGrid">{modules.map((module, index) => <article className="adminModule" key={module.title}><div className="adminModuleTop"><span className="adminModuleNumber">{String(index+1).padStart(2,"0")}</span><span className={module.status === "Sender verified" || module.status === "Static guides live" ? "adminTag goodTag" : "adminTag pendingTag"}>{module.status}</span></div><h3>{module.title}</h3><p>{module.detail}</p><Link href={module.href}>{module.action} →</Link></article>)}</section>
      <section className="adminCompliance"><div><span className="eyebrow">BEFORE SELLING MEDICINES</span><h2>Compliance checklist</h2><p>Every regulated listing needs the correct product, supplier, registration and advertising evidence before it can be approved.</p></div><ul><li>Confirm supplier and product authenticity</li><li>Verify applicable NAFDAC registration and approved claims</li><li>Confirm Kedi website and trademark permission where applicable</li><li>Apply Kedi retail pricing and written promotion rules</li><li>Keep prescription-only and controlled medicines blocked unless a lawful workflow is approved</li></ul><div className="adminComplianceLinks"><Link href="https://ocl.it.com/legal/drug-policy">Drug policy</Link><Link href="https://ocl.it.com/legal/kedi-seller-policy">Kedi seller policy</Link><Link href="https://ocl.it.com/legal/refund">Refund policy</Link></div></section>
      <footer className="adminFooter">OCL Health • Private administration • No customer or sales metrics are shown until connected data is available.</footer>
    </div>
  </main>;
}
