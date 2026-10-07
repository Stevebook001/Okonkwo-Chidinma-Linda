const products = [
  { name: "Vitamin C 1000mg", category: "Vitamins & Supplements", price: "₦—", status: "Price coming soon" },
  { name: "Paracetamol", category: "Pain & Fever", price: "₦—", status: "Price coming soon" },
  { name: "Antacid Suspension", category: "Digestive Health", price: "₦—", status: "Price coming soon" }
];

const topics = ["Pharmacy tips", "Medicine education", "Women's health", "Men's health", "Nutrition", "Wellness"];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="/"><span className="brandMark">+</span><span>OCL <b>Health</b></span></a>
        <nav>
          <a href="#about">About</a><a href="#marketplace">Marketplace</a><a href="#blog">Health Blog</a><a href="#contact">Contact</a>
          <a className="navButton" href="/admin">Admin</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">PHARMACY • CHEMISTRY • WELLNESS</span>
          <h1>Better health decisions start with <em>better information.</em></h1>
          <p>OCL Health is being built as a trusted health education and pharmacy platform — combining practical health articles, product information, wellness guidance and a growing healthcare community.</p>
          <div className="actions"><a className="primary" href="#marketplace">Explore marketplace</a><a className="secondary" href="#blog">Read health articles →</a></div>
          <small>Information on this website is educational and does not replace advice from a qualified healthcare professional.</small>
        </div>
        <div className="heroCard">
          <div className="pulse">+</div>
          <span>OCL HEALTH</span><strong>Trusted. Clear. Human.</strong>
          <div className="miniStats"><div><b>24/7</b><small>Health resources</small></div><div><b>100%</b><small>Education first</small></div></div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="sectionIntro"><span className="eyebrow">THE VISION</span><h2>A health platform that can grow with her team.</h2><p>Start lean today, then expand into a full health marketplace, professional content platform, newsletter, analytics and advertising business.</p></div>
        <div className="featureGrid">{[
          ["Health Blog","Publish useful, search-friendly articles across pharmacy, chemistry, wellness and everyday health."],
          ["Product Marketplace","Show product images, descriptions, category, availability and an admin-controlled current price."],
          ["Team Dashboard","A secure workspace for authorised team members to publish, edit products, manage content and review enquiries."],
          ["Newsletter","Build an audience with a simple subscription flow and future email campaigns."],
          ["Google AdSense","Prepare the site for AdSense with original content, policies, navigation and privacy requirements."],
          ["SEO Ready","Structured pages, metadata, clean URLs and content architecture designed for organic discovery."]
        ].map(([title,text]) => <article className="feature" key={title}><div className="featureIcon">✓</div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="marketplace" className="section tinted">
        <div className="sectionHead"><div><span className="eyebrow">MARKETPLACE</span><h2>Health products, explained clearly.</h2></div><a href="#contact">Ask about a product →</a></div>
        <div className="productGrid">{products.map(p => <article className="product" key={p.name}><div className="productImage"><span>OCL</span></div><div className="productBody"><span>{p.category}</span><h3>{p.name}</h3><p>Product information, intended use, key details and safety notes will appear here.</p><strong>{p.price}</strong><small>{p.status}</small></div></article>)}</div>
        <p className="notice">Prices will be managed from the admin area and should show a “last updated” date. Medicine availability and pricing can change; verify before purchase.</p>
      </section>

      <section id="blog" className="section">
        <div className="sectionHead"><div><span className="eyebrow">HEALTH BLOG</span><h2>Content that helps people find OCL.</h2></div><a href="/admin">Publish from dashboard →</a></div>
        <div className="topicRow">{topics.map(t => <span key={t}>{t}</span>)}</div>
        <div className="articleGrid">{[
          ["How to read a medicine label safely","Medicine education"],
          ["What pharmacists want you to know about self-medication","Pharmacy tips"],
          ["Simple nutrition habits that support everyday wellness","Nutrition"]
        ].map(([title,cat]) => <article className="article" key={title}><div className="articleImage"></div><span>{cat}</span><h3>{title}</h3><p>Article preview content will be managed through the publishing dashboard.</p><a href="#contact">Coming soon →</a></article>)}</div>
      </section>

      <section className="newsletter"><div><span className="eyebrow">OCL NEWSLETTER</span><h2>Useful health knowledge, without the noise.</h2><p>Let visitors subscribe for new articles, wellness resources and OCL updates.</p></div><form><input type="email" placeholder="Your email address" aria-label="Email address"/><button type="submit">Subscribe</button></form></section>

      <section id="contact" className="contact section">
        <span className="eyebrow">CONTACT</span><h2>Have a health question or product enquiry?</h2><p>OCL Health can grow into a trusted digital front door for the founder and her healthcare team.</p><a className="primary" href="mailto:hello@ocl.it.com">Contact OCL Health</a>
      </section>

      <footer><div className="footerTop"><div><a className="brand" href="/"><span className="brandMark">+</span><span>OCL <b>Health</b></span></a><p>Pharmacy, chemistry, wellness and health education.</p></div><div><b>Explore</b><a href="#marketplace">Marketplace</a><a href="#blog">Health Blog</a><a href="#about">About</a></div><div><b>Business</b><a href="/admin">Admin</a><a href="#contact">Contact</a><a href="#contact">Newsletter</a></div><div><b>Legal</b><a href="#contact">Privacy</a><a href="#contact">Terms</a><a href="#contact">Medical disclaimer</a></div></div><div className="footerBottom">© 2026 OCL Health. Built with care. • Not a substitute for professional medical advice.</div></footer>
    </main>
  );
}
