import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<string, { category: string; title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  "read-a-medicine-label": {
    category: "MEDICINE EDUCATION",
    title: "How to read a medicine label safely",
    intro: "A medicine label contains important information about what a product is, how it should be used, and when extra care is needed. Take time to read the complete label before use.",
    sections: [
      { heading: "Check the active ingredient and strength", body: "Look for the active ingredient and the amount in each tablet, capsule, measured dose or other unit. Different products can contain the same ingredient, so comparing labels can help you avoid accidentally taking duplicate ingredients. Ask a pharmacist if any wording is unclear." },
      { heading: "Follow the directions and warnings", body: "Read the stated dose, timing, route of use, age restrictions, warnings and instructions about food or other medicines. Do not assume that a dose suitable for one person is suitable for another. Children, older adults, pregnant people and people with ongoing medical conditions may need individual advice." },
      { heading: "Check expiry and storage information", body: "Do not use a product if its packaging is damaged, its identity is uncertain, or it is past its expiry date. Follow the storage instructions and keep medicines out of reach of children." },
      { heading: "When to ask for help", body: "Ask a pharmacist or qualified healthcare professional before use if you have allergies, take other medicines, are unsure about the directions, or notice an unexpected reaction. Seek urgent care for severe or rapidly worsening symptoms." },
    ],
  },
  "questions-for-your-pharmacist": {
    category: "PHARMACY TIPS",
    title: "Questions to ask your pharmacist before using a medicine",
    intro: "A short conversation with a pharmacist can help you understand a medicine and use it more safely. You never need to feel embarrassed about asking for clarification.",
    sections: [
      { heading: "Understand what the medicine is for", body: "Ask what the medicine is intended to treat, what benefit to expect, and how long it may take to work. Confirm whether it is appropriate for your age and circumstances." },
      { heading: "Clarify how to use it", body: "Ask how much to take, when to take it, how to measure a liquid, what to do if you miss a dose, and whether food or drink affects use. Follow the product label and the advice given for you." },
      { heading: "Share relevant information", body: "Tell the pharmacist about allergies, other medicines and supplements, pregnancy or breastfeeding, and relevant health conditions. This helps them check for possible risks and interactions." },
      { heading: "Know what to watch for", body: "Ask about common side effects, important warning signs, and when to stop the medicine or seek help. If instructions remain unclear, ask the pharmacist to explain them in another way." },
    ],
  },
  "sustainable-nutrition-habits": {
    category: "EVERYDAY WELLNESS",
    title: "Building simple, sustainable nutrition habits",
    intro: "Everyday nutrition does not need to begin with extreme rules. Small, realistic changes that fit your budget, culture, preferences and routine are often easier to maintain.",
    sections: [
      { heading: "Build meals around variety", body: "When available, aim for a variety of vegetables and fruit, beans and other legumes, whole grains, and suitable protein sources. No single food provides everything the body needs; variety matters over time." },
      { heading: "Make water an easy choice", body: "Keep safe drinking water accessible and choose drinks with less added sugar more often. Individual fluid needs can vary with climate, activity, age and health, so follow clinical advice if you have been given fluid restrictions." },
      { heading: "Choose habits you can repeat", body: "Plan a few affordable meals, keep nourishing snacks available when practical, and make changes gradually. You do not need expensive products, detoxes or miracle supplements to begin improving everyday habits." },
      { heading: "Get personalised advice when needed", body: "Nutrition needs can change with medical conditions, medicines, pregnancy and other circumstances. A qualified healthcare professional or registered dietitian can help you find an approach that suits your needs." },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  return {
    title: article ? `${article.title} | OCL Health` : "Health article | OCL Health",
    description: article?.intro ?? "Health education from OCL Health.",
    alternates: { canonical: `https://blogs.ocl.it.com/articles/${slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <main className="articlePage">
      <header className="portalNav"><Link className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></Link><Link href="/">All health articles →</Link></header>
      <article className="articleContent">
        <span className="eyebrow">{article.category}</span>
        <h1>{article.title}</h1>
        <p className="articleLead">{article.intro}</p>
        <div className="articleMeta">OCL Health Editorial • General educational information</div>
        {article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
        <aside className="medicalNotice"><strong>Important health notice</strong><p>This article is for general education only. It does not provide a diagnosis or individual treatment advice and does not replace a consultation with a qualified healthcare professional. For urgent or severe symptoms, seek appropriate medical care.</p></aside>
        <Link className="primary articleBack" href="/">← Back to OCL Health Journal</Link>
      </article>
      <footer><div className="footerBottom">© 2026 OCL Health • Clear information, responsible education.</div></footer>
    </main>
  );
}
