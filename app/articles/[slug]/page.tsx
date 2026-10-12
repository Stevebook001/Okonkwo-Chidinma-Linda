import Link from "next/link";
import { notFound } from "next/navigation";

type Section = { heading: string; paragraphs: string[] };
type Article = { category: string; title: string; description: string; cover: string; intro: string; sections: Section[]; reviewed: string };

const articles: Record<string, Article> = {
  "read-a-medicine-label": {
    category: "MEDICINE EDUCATION",
    title: "How to read a medicine label safely",
    description: "A practical guide to understanding active ingredients, strengths, directions, warnings, storage and expiry information on medicine labels.",
    cover: "/blog/medicine-label.svg",
    intro: "A medicine label is more than a name on a box. It is a safety guide that helps you identify the product, understand the instructions and recognise when to ask a pharmacist for help. This guide explains the main details to check without replacing personal medical advice.",
    reviewed: "OCL Health Editorial • General educational information",
    sections: [
      { heading: "1. Start with the exact product name", paragraphs: [
        "Begin by checking the full product name on the outer carton, bottle, blister pack or leaflet. Similar names can refer to different ingredients, strengths or formulations. Do not rely only on colour, packaging shape or a familiar logo. Read the entire name and compare it with the prescription or instructions you were given.",
        "Check the dosage form too: a tablet, capsule, liquid, cream, eye drop and injection are not interchangeable simply because they share a brand name. If the product supplied differs from what you expected, pause before using it and ask the dispensing pharmacist or supplier to confirm the discrepancy. A small difference in wording may matter."
      ]},
      { heading: "2. Find the active ingredient", paragraphs: [
        "The active ingredient is the substance intended to produce the medicine's effect. It may be printed below the brand name, in a composition panel, or on the patient information leaflet. Knowing the ingredient helps you compare products and avoid accidentally using two different brands that contain the same medicine.",
        "Combination products can contain more than one active ingredient. Cold, flu, pain and sleep products are common examples where ingredients may overlap. If you already take prescription or over-the-counter medicines, ask a pharmacist to check the complete list rather than deciding from brand names alone. Never assume that two differently branded products have different ingredients."
      ]},
      { heading: "3. Understand the strength and units", paragraphs: [
        "Strength tells you how much active ingredient is present in a unit or measured amount. It may be shown in milligrams (mg), micrograms (mcg or µg), grams (g), millilitres (mL), percentage, or another unit appropriate to the product. Read the number and unit together; the number alone is not enough.",
        "Liquid medicines may state a concentration such as a certain number of milligrams per five millilitres. This is not the same as the total amount in the bottle. Use only the measuring device and instructions supplied or recommended by a pharmacist. Kitchen spoons are not reliable medicine measures, and you should not calculate a child's dose from an adult label unless a qualified professional specifically instructs you."
      ]},
      { heading: "4. Read the directions in full", paragraphs: [
        "The directions explain how the product is intended to be taken or applied, how often it may be used, and whether it should be used with food, water or another precaution. Follow the directions provided for you, including the prescribed amount and duration. Do not increase the amount, take doses closer together or continue beyond the stated period just because symptoms remain.",
        "If a prescription label and package leaflet seem to conflict, do not guess which instruction to follow. Contact the pharmacist or prescriber who knows your circumstances. The right directions may differ based on age, kidney or liver function, other medicines and the reason the medicine was supplied. Keep the written instructions so you can refer to them accurately."
      ]},
      { heading: "5. Notice who should not use the product", paragraphs: [
        "Labels may include contraindications, age limits or warnings for people with particular conditions. They may also advise extra care during pregnancy or breastfeeding, for people with allergies, or for people who take other medicines. These warnings are not decorative; they identify situations where the risks may be different.",
        "Do not assume a product is safe because a relative or friend has used it. Personal circumstances vary, and an ingredient that is appropriate for one person may be unsuitable for another. Tell your pharmacist about allergies, existing conditions, pregnancy or breastfeeding, and every medicine or supplement you use. If a label warning applies to you, get professional advice before using the product."
      ]},
      { heading: "6. Check interactions and duplicate ingredients", paragraphs: [
        "Some medicines interact with other medicines, supplements, alcohol or certain foods. Other products can increase the effects or side effects of a medicine. Labels may highlight important interactions, but a package cannot list every possible combination for every person. A pharmacist can review your complete medication list and help identify relevant risks.",
        "A practical habit is to keep an up-to-date list of medicine names, strengths, how often you use them, and any allergies or previous reactions. Bring the list to appointments and show it to a pharmacist before starting a new product. Include herbal products and supplements, because 'natural' does not automatically mean interaction-free or safe for every user."
      ]},
      { heading: "7. Understand warnings and side effects", paragraphs: [
        "Read the warning panel and leaflet before use, not only after a problem occurs. They may describe common side effects, activities to avoid, symptoms requiring urgent help and what to do if too much is taken. Some medicines can cause drowsiness or affect alertness; do not drive or operate machinery if the label or professional advice says not to.",
        "A side effect is not always an allergy, but a serious reaction can require urgent attention. If you develop breathing difficulty, swelling of the face or throat, collapse or another severe symptom after taking a medicine, seek emergency medical help. For less urgent but unexpected reactions, stop and seek professional advice according to the product instructions and your clinician's guidance."
      ]},
      { heading: "8. Look for expiry dates and batch details", paragraphs: [
        "Check the expiry date before use and understand how it is printed. Depending on the package, the date may show month and year or a full date. Do not use a product past its expiry date, and do not use a product whose date is missing, altered or impossible to read. Expiry dates assume the product has been stored correctly in its original packaging.",
        "Batch or lot numbers help manufacturers and regulators identify particular production runs. Keep the carton or take a clear photograph of the relevant details if you need to report a quality concern. If a product is recalled or a safety alert is issued, batch information may help determine whether your item is affected. Do not remove or obscure important packaging information."
      ]},
      { heading: "9. Check packaging integrity and authenticity", paragraphs: [
        "Before using a product, inspect the seal, cap, blister, label and outer carton. Avoid products with broken seals, unexplained damage, suspicious spelling, altered dates, leaking containers or packaging that does not match the expected presentation. Appearance alone cannot prove authenticity, but warning signs should prompt you to pause and seek confirmation.",
        "Buy regulated products only through authorised, reputable sources. Where a registration number is required, verify it through the relevant official channel and check that the registered name and product details match the item in hand. A printed number is not proof by itself; fraudulent sellers may copy valid numbers onto unrelated products. Report suspected falsified or unregistered products to the appropriate authority."
      ]},
      { heading: "10. Follow storage instructions", paragraphs: [
        "Some medicines need room-temperature storage, while others require refrigeration or protection from light, heat or moisture. Follow the product's stated storage conditions and do not leave medicines in a hot car, direct sunlight or a damp bathroom if the label warns against it. Avoid transferring medicines into unlabelled containers unless a qualified professional provides an appropriate system.",
        "Keep medicines in their original packaging when possible, away from children and pets, and separate from food or household chemicals. Do not freeze a product unless its instructions specifically require it. If a medicine has been exposed to extreme heat, water or an uncertain temperature, ask a pharmacist whether it remains usable instead of relying on smell or appearance."
      ]},
      { heading: "11. Use a leaflet and ask questions", paragraphs: [
        "The patient information leaflet may explain the product's purpose, use, warnings, side effects, missed doses, overdose precautions and storage in more detail than the carton. Read it when you first receive the medicine and keep it available for reference. If the leaflet is missing, unreadable or not in a language you understand, ask the pharmacist for an accessible explanation.",
        "Useful questions include: What is this medicine for? How and when should I take it? How long should I use it? What if I miss a dose? Which side effects require help? Can it interact with my other medicines? How should it be stored? What should I do if the packaging looks damaged? Asking these questions is responsible, not embarrassing."
      ]},
      { heading: "12. Special care for children and older adults", paragraphs: [
        "Children are not simply smaller adults. The correct medicine and amount may depend on age, weight, formulation and the condition being treated. Use a proper measuring device for liquids, store medicines securely, and never use an adult dose as a shortcut. If the child is very young, symptoms are severe, or you are uncertain about a dose, contact a qualified healthcare professional.",
        "Older adults may use several medicines at once and may have conditions that affect how medicines work. A pharmacist can help review duplicate ingredients, complex schedules, storage and potential interactions. If a person has difficulty reading small print, hearing instructions or opening packaging, ask for practical assistance while keeping the medicine clearly identified and safely stored."
      ]},
      { heading: "13. What to do if you make a mistake", paragraphs: [
        "If you take the wrong medicine, an uncertain amount, or a dose at the wrong time, do not try to correct the mistake by taking extra doses or inducing vomiting unless a qualified professional or emergency service specifically tells you to. Keep the packaging and write down what was taken, how much, and when, if known.",
        "Seek urgent medical advice when the product or amount could be dangerous, when a child may have swallowed medicine, or when symptoms appear. Do not wait for symptoms if the situation may be serious. If you are unsure whether the event is urgent, contact local emergency or poison-information services where available, or a healthcare professional who can guide you."
      ]},
      { heading: "14. A simple label-check routine", paragraphs: [
        "Before each new medicine, pause and check the name, active ingredient, strength, instructions, warnings, expiry date and storage conditions. Confirm that the product is intended for the person who will use it and that it matches the directions from the pharmacist or prescriber. If any detail differs from what you expected, stop and ask rather than guessing.",
        "Keep a short medication list, use medicines only as directed, and store them securely. Labels are important, but they cannot replace individual professional advice. OCL Health provides general education only; a pharmacist, doctor or other qualified healthcare professional should help with decisions that depend on your health, age, other medicines or symptoms."
      ]}
    ]
  },
  "questions-for-your-pharmacist": {
    category: "PHARMACY TIPS",
    title: "Questions to ask your pharmacist before using a medicine",
    description: "A detailed checklist for discussing purpose, instructions, interactions, side effects, storage, affordability and follow-up with a pharmacist.",
    cover: "/blog/pharmacist-conversation.svg",
    intro: "A useful pharmacy conversation helps you understand what a medicine is for, how to use it and when to seek help. You do not need medical vocabulary to ask good questions. Preparing a short list can make the conversation clearer and help the pharmacist give advice that fits your situation.",
    reviewed: "OCL Health Editorial • General educational information",
    sections: [
      { heading: "1. Start by explaining what you need help with", paragraphs: [
        "Tell the pharmacist whether you are collecting a prescription, considering an over-the-counter product, asking about a side effect or trying to understand instructions. Briefly describe the concern and when it began. You do not need to diagnose yourself or use technical terms; plain language is often the clearest starting point.",
        "Share relevant context, such as the person's age, known allergies, pregnancy or breastfeeding where relevant, ongoing medical conditions, and other medicines or supplements. This information can affect the safety of a recommendation. If you are asking on behalf of someone else, be clear about what you know and what you do not know rather than guessing."
      ]},
      { heading: "2. Ask what the medicine is intended to do", paragraphs: [
        "Ask: What is this medicine intended to treat, and what benefit should I reasonably expect? A pharmacist can explain the approved purpose in everyday language and clarify whether the medicine is intended to relieve a symptom, manage a long-term condition or address another specific need.",
        "It is also useful to ask what the medicine cannot do. Some products relieve symptoms without treating the underlying cause, and some benefits take time to develop. Be cautious of anyone who promises an immediate or guaranteed cure. If symptoms are severe, persistent or worsening, ask whether you need assessment by a doctor or another qualified professional."
      ]},
      { heading: "3. Confirm the exact dose and schedule", paragraphs: [
        "Ask how much to use, how often, at what times and for how many days. Confirm the instructions for the exact product and strength you have been given. If the label uses unfamiliar units or a liquid measurement, ask the pharmacist to show you the correct measuring device and explain the amount.",
        "Do not assume that a dose you remember from a previous illness is correct for this situation. Directions may change with formulation, age, weight, other medicines and medical conditions. If the printed label appears inconsistent with what the prescriber told you, pause and ask the pharmacy to clarify before you use the medicine."
      ]},
      { heading: "4. Ask what to do about a missed dose", paragraphs: [
        "Missed-dose instructions differ between medicines. Ask what to do if you forget a dose, remember late or are unsure whether you already took it. Do not automatically double the next dose or take doses closer together to catch up unless the product's instructions or a qualified professional explicitly directs you to do so.",
        "If your schedule is difficult to remember, ask whether a written timetable, phone reminder or medicine organiser is suitable for your particular product. Some medicines need special handling and should not be removed from original packaging. The pharmacist can help you design a routine without changing the prescribed dose or timing."
      ]},
      { heading: "5. Discuss allergies and previous reactions", paragraphs: [
        "Tell the pharmacist about known allergies and any previous reaction to a medicine, including what happened and how soon it started. If you do not know the name of the medicine that caused a reaction, describe the packaging or circumstances as accurately as possible. This can help the pharmacist assess whether an ingredient or related product may be a concern.",
        "Ask which symptoms require urgent attention and which should prompt you to contact the pharmacy or prescriber. Severe breathing problems, swelling of the face or throat, collapse or other serious symptoms require emergency medical help. Do not minimise a reaction simply because it improved on its own; record it and tell your healthcare team."
      ]},
      { heading: "6. Check interactions with other medicines", paragraphs: [
        "Bring a list or photographs of all medicines you use, including prescriptions, non-prescription products, vitamins, herbal remedies and supplements. Mention occasional medicines too, not only those you take daily. Ask the pharmacist to check whether the new product could interact with anything on the list or duplicate an ingredient already present.",
        "Also ask about alcohol, food, caffeine or other substances if they may matter for the product. Interaction advice is specific; a general online list cannot reliably evaluate your complete circumstances. If you receive care from multiple clinics or pharmacies, keeping one updated medicine list can reduce confusion and help professionals coordinate their advice."
      ]},
      { heading: "7. Understand side effects and warning signs", paragraphs: [
        "Ask which side effects are common, which are serious and what you should do if they occur. Find out whether the medicine can affect alertness, balance, digestion, sleep or other daily activities. Read the patient leaflet as well, because the pharmacist's explanation and the written information work together.",
        "Ask how to report a suspected adverse reaction and whether the medicine should be stopped or reviewed if a particular symptom appears. Do not stop essential prescribed treatment on your own unless the instructions or an urgent safety situation requires it; get professional guidance. For severe or rapidly worsening symptoms, seek emergency care rather than waiting for a routine pharmacy reply."
      ]},
      { heading: "8. Ask about food, drinks and everyday routines", paragraphs: [
        "Some medicines are best taken with food, while others need an empty stomach or a particular interval around meals. Ask for the exact instruction and whether it applies every time. If your work schedule, fasting routine or daily responsibilities make the schedule difficult, explain that so the pharmacist can advise on a safe practical routine.",
        "Ask whether you should avoid driving, operating machinery, drinking alcohol or doing a specific activity while using the medicine. Do not rely on a friend’s experience because side effects and restrictions vary. If the medicine causes dizziness, drowsiness or another unexpected effect, take appropriate precautions and seek advice before resuming activities that could put you or others at risk."
      ]},
      { heading: "9. Check storage and travel arrangements", paragraphs: [
        "Ask how the medicine should be stored at home and what to do if it is exposed to heat, moisture, freezing or direct sunlight. Some products have strict temperature requirements. Keep medicines away from children and pets, and retain labels so the identity and expiry date remain clear.",
        "If you travel, ask whether the medicine should remain in its original packaging, whether it needs a cooler or other special handling, and what documentation may be required. Never leave temperature-sensitive products in a hot vehicle. If a product's condition is uncertain after travel or a power failure, ask a pharmacist whether it remains suitable rather than judging only by appearance."
      ]},
      { heading: "10. Discuss cost without embarrassment", paragraphs: [
        "If the cost is difficult, tell the pharmacist. They may be able to explain whether a lower-cost equivalent exists, whether a different pack size is available, or whether there are lawful support options. Do not switch to a different product or strength on your own simply because it is cheaper.",
        "Ask whether the product is prescription-only, whether a prescription is required, and whether any proposed substitute contains the same active ingredient and is appropriate for you. A lower price does not automatically mean a product is safe or authentic. Buy through reputable authorised sources, check packaging and registration details where applicable, and avoid sellers who make unrealistic claims."
      ]},
      { heading: "11. Clarify what happens after the first dose", paragraphs: [
        "Ask how soon the medicine is expected to help, how long you should continue it, and what to do if it does not seem to work. The answer depends on the product and condition. Some symptoms require timely clinical assessment rather than repeated attempts with different over-the-counter products.",
        "Ask whether you need a follow-up appointment, a monitoring test or a refill review. If the medicine is intended for ongoing use, find out how to request a repeat prescription safely and how far in advance to arrange it. Do not share prescription medicines or use another person's supply, even when the symptoms seem similar."
      ]},
      { heading: "12. Make sure you understand the answer", paragraphs: [
        "Before leaving, repeat the instructions in your own words: the amount, timing, duration and key warnings. This gives the pharmacist a chance to correct a misunderstanding. Ask for written directions if you are worried you may forget, and request a larger-print or otherwise accessible version if needed.",
        "If you use a language other than the one on the label, ask for an explanation you can understand. A family member may help with communication where appropriate, but sensitive questions should be handled respectfully and privately. Never feel pressured to pretend you understand. It is safer to ask the same question again than to use a medicine based on an uncertain instruction."
      ]},
      { heading: "13. Know when the pharmacy is not enough", paragraphs: [
        "A pharmacist can answer many medicine questions, but some symptoms require medical assessment. Ask what warning signs mean you should contact a doctor, attend a clinic or seek urgent care. Severe chest pain, difficulty breathing, collapse, major bleeding or other serious symptoms should not be managed through a website or routine message.",
        "For a new, persistent or worsening symptom, do not keep adding products without a review. Several products can mask symptoms or duplicate ingredients. The pharmacist can help you understand safe next steps and whether a prescriber should assess the problem."
      ]},
      { heading: "14. Keep a record for future conversations", paragraphs: [
        "After the conversation, note the medicine name, strength, instructions, date started and any important warning the pharmacist highlighted. Keep the leaflet and receipt if available. A short record can help you remember what was discussed and make it easier to explain a problem later.",
        "Update the record when a medicine is started, stopped or changed, and bring it to healthcare appointments. Share only necessary information through secure channels. OCL Health articles are general education and cannot replace a pharmacist's individual review, but being prepared helps you make better use of professional care."
      ]}
    ]
  },
  "sustainable-nutrition-habits": {
    category: "EVERYDAY WELLNESS",
    title: "Building simple, sustainable nutrition habits",
    description: "Practical, flexible ideas for balanced meals, hydration, food planning, affordability and sustainable everyday nutrition habits.",
    cover: "/blog/nutrition-habits.svg",
    intro: "Nutrition advice can feel complicated, expensive or full of strict rules. A more useful starting point is to build small habits that fit your budget, culture, schedule and needs. This guide offers general ideas rather than a personalised diet or a promise to treat any condition.",
    reviewed: "OCL Health Editorial • General educational information",
    sections: [
      { heading: "1. Aim for variety rather than perfection", paragraphs: [
        "No single food supplies every nutrient the body needs. Over time, a varied eating pattern can include vegetables and fruit, beans and other legumes, whole grains, and suitable protein sources. The best combination depends on availability, culture, preferences, health needs and budget, so there is no single perfect plate that suits everyone.",
        "Try adding one useful item to a meal rather than judging the entire meal as good or bad. If you usually eat rice, for example, you might add beans, vegetables or another available food that brings variety. Small additions can be more realistic than replacing every familiar meal at once. Consistency over time matters more than achieving an ideal meal every day."
      ]},
      { heading: "2. Build meals around foods you can access", paragraphs: [
        "Healthy eating does not require expensive imported products, branded powders or fashionable ingredients. Local staples, seasonal produce, beans, eggs, fish, nuts or other accessible foods may help form balanced meals, depending on individual needs and local prices. Choose options that your household can afford and prepare safely.",
        "Plan around what is commonly available where you shop. Frozen, dried or canned options may be useful when fresh produce is costly or difficult to store; compare labels and consider salt or added sugar where relevant. If a particular food is unavailable, use a practical alternative rather than abandoning the whole plan."
      ]},
      { heading: "3. Make vegetables and fruit easier to include", paragraphs: [
        "Vegetables and fruit provide fibre and a range of vitamins, minerals and other compounds. Try keeping washed, safely stored produce visible and ready to use, or adding a familiar vegetable to a dish you already prepare. Frozen or appropriately stored options can also be convenient when fresh food spoils quickly.",
        "You do not need to buy every type or eat the same quantity at every meal. Choose what is seasonal, affordable and acceptable to your household. If you have a medical condition that affects food choices, such as a condition requiring a specific dietary plan, ask a qualified professional for guidance rather than following a general article as a prescription."
      ]},
      { heading: "4. Include protein sources that fit your routine", paragraphs: [
        "Protein supports many functions in the body, and a variety of foods can contribute to intake. Depending on availability and personal preference, options may include beans, peas, lentils, eggs, fish, meat, dairy foods, nuts, seeds or suitable alternatives. Combining different foods across the day can help provide variety.",
        "There is no need to purchase a supplement solely because an advertisement promises better health or rapid body changes. Supplements may be useful in particular circumstances, but they can have risks and interactions. If you are considering one because of symptoms, pregnancy, a diagnosed deficiency or a restricted diet, ask a qualified healthcare professional whether it is appropriate."
      ]},
      { heading: "5. Choose whole grains and fibre where practical", paragraphs: [
        "Whole grains and other fibre-containing foods can support digestive health and make meals more satisfying for many people. Depending on your local diet, options may include oats, whole-grain breads, brown rice, millet, maize, whole-grain cereals, beans, vegetables and fruit. Small substitutions can help if you enjoy the taste and can afford them.",
        "Increase fibre gradually and drink suitable fluids, because a sudden large change can cause discomfort for some people. People with specific digestive conditions or medical restrictions may need personalised advice. Food labels can help compare products, but a single label number should not be treated as the only measure of whether a food belongs in your diet."
      ]},
      { heading: "6. Make hydration a regular habit", paragraphs: [
        "Water is a practical default drink for many people, and keeping safe drinking water accessible can make it easier to drink regularly. Needs vary with climate, physical activity, age, pregnancy, illness and other factors. People who have been told to restrict fluids or follow a medical hydration plan should follow their clinician's advice rather than a generic target.",
        "If you often forget to drink, connect it to a routine such as meals or breaks, or carry a clean reusable bottle when appropriate. Drinks with a lot of added sugar may contribute extra energy without the same nutritional value as a varied meal. There is no need to buy expensive detox drinks or products claiming to cleanse the body; normal body systems already handle waste removal."
      ]},
      { heading: "7. Plan a few meals before shopping", paragraphs: [
        "A simple plan can reduce stress, food waste and unplanned spending. Before shopping, check what is already at home, choose a few meals you know how to prepare, and make a list of the ingredients you need. Plan for leftovers when they can be stored and reheated safely.",
        "You do not need a seven-day meal plan with every portion measured. Start with two or three reliable options for busy days and keep ingredients for them available when possible. A flexible plan is easier to maintain when work, family responsibilities, prices or availability change. Adjust the plan without treating a missed meal-prep day as failure."
      ]},
      { heading: "8. Understand food labels without getting overwhelmed", paragraphs: [
        "Labels can help compare serving sizes, ingredients, added sugars, sodium, fibre and other information. First check the serving size, because the values shown may apply to a portion smaller than the amount you usually eat. Compare similar products rather than comparing unrelated foods using one number.",
        "Ingredients are often listed in order of amount by weight, but interpretation depends on the product. If you have a food allergy, read the allergen information carefully and contact the manufacturer when information is unclear. Label-reading is a tool, not a moral test. You can make a practical choice without memorising every nutrient or avoiding every packaged food."
      ]},
      { heading: "9. Keep food safety in the routine", paragraphs: [
        "Nutrition and food safety go together. Wash hands before preparing food, use clean utensils, separate raw foods from ready-to-eat items, and cook foods thoroughly according to appropriate food-safety guidance. Refrigerate perishable foods promptly and avoid eating items that have been stored under unsafe conditions.",
        "Safe drinking water, clean storage containers and sensible handling help reduce the risk of foodborne illness. When power outages or heat make storage uncertain, be cautious with foods that require refrigeration. Do not rely only on smell or taste to decide whether a food is safe. People with weakened immune systems or other risk factors may need additional precautions advised by a qualified professional."
      ]},
      { heading: "10. Make changes gradually", paragraphs: [
        "Large sudden changes can be difficult to sustain, especially when they require new ingredients, equipment or a schedule that does not fit your life. Choose one habit to practise for a week, such as adding a fruit when available, preparing a simple lunch, or drinking water with a regular meal. Then decide whether it helped and what needs adjusting.",
        "A useful goal is one you can repeat most days, not a rule that creates guilt when life gets busy. If you miss a day, return to the habit at the next practical opportunity. Track how a change fits your energy, enjoyment, cost and routine rather than judging success by quick weight changes or an online challenge."
      ]},
      { heading: "11. Be cautious with diet claims and supplements", paragraphs: [
        "Be sceptical of products promising rapid weight loss, guaranteed disease cures, body transformation without effort or results that work for everyone. Strong health claims should be supported by reliable evidence and must comply with relevant advertising rules. Personal testimonials and dramatic before-and-after pictures cannot prove that a product caused the result.",
        "Herbal products and supplements can contain active ingredients and may interact with medicines or be unsuitable for some people. 'Natural' is not a guarantee of safety. Before starting a supplement to treat a symptom or condition, consult a qualified healthcare professional, especially if you take prescription medicines, are pregnant or breastfeeding, or have a chronic condition."
      ]},
      { heading: "12. Adapt advice to your health and culture", paragraphs: [
        "Food is connected to culture, family, faith, celebration and comfort. A sustainable approach should respect these relationships rather than requiring people to abandon every familiar dish. Portion, preparation method, frequency and what accompanies a meal may offer practical areas to adjust, depending on individual needs and advice.",
        "Some people need personalised nutrition guidance because of diabetes, kidney disease, food allergies, digestive disorders, pregnancy, eating-disorder history or other circumstances. General online content cannot calculate an appropriate plan for these situations. Ask a qualified healthcare professional or registered dietitian for individual advice and tell them what foods are realistically available to you."
      ]},
      { heading: "13. Think about sleep, movement and daily rhythms", paragraphs: [
        "Nutrition is one part of wellbeing, alongside sleep, movement, stress management, social connection and access to healthcare. A realistic routine might include regular meals, a walk or another enjoyable activity that fits your ability, and a consistent bedtime when possible. Avoid treating any one habit as a cure for every health concern.",
        "If you are exhausted, unwell or struggling with a significant change in appetite, weight or energy, do not assume the answer is simply more discipline. Symptoms can have many causes and may require medical assessment. Choose changes that feel safe and manageable, and seek help when a concern persists or interferes with daily life."
      ]},
      { heading: "14. Build a household routine that can last", paragraphs: [
        "If you share meals with family, invite people to help choose a few affordable meals and agree on small changes that work for everyone. Preparing ingredients together, storing leftovers safely and keeping a shopping list can reduce the burden on one person. Avoid shaming household members about body size, appetite or food preferences.",
        "A sustainable routine should be flexible enough for celebrations, travel, busy periods and changing budgets. It is normal for eating patterns to vary from day to day. Return to your practical habits when you can, and ask for professional support if food choices cause significant distress or conflict."
      ]},
      { heading: "15. A simple one-week starting point", paragraphs: [
        "For the next week, choose one breakfast or meal you can prepare reliably, add a vegetable or fruit when practical, keep safe drinking water accessible and plan one shopping trip around a short list. Notice what saves time, what costs too much and what the household actually enjoys. Adjust the plan using what you learn.",
        "The aim is not perfection or a rapid result. It is to create a few repeatable actions that make balanced choices easier. OCL Health shares general educational information, not a personalised treatment plan. If you have a health condition or specific nutrition concern, discuss it with a qualified healthcare professional who can take your individual needs into account."
      ]}
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  return {
    title: article ? `${article.title} | OCL Health` : "Health article | OCL Health",
    description: article?.description ?? "Health education from OCL Health.",
    alternates: { canonical: `https://blogs.ocl.it.com/articles/${slug}` },
    openGraph: { title: article?.title ?? "OCL Health article", description: article?.description ?? "Health education from OCL Health.", url: `https://blogs.ocl.it.com/articles/${slug}`, siteName: "OCL Health", type: "article", images: [{ url: `/articles/${slug}/opengraph-image`, width: 1200, height: 630, alt: article?.title ?? "OCL Health article" }] },
    twitter: { card: "summary_large_image", title: article?.title ?? "OCL Health article", description: article?.description, images: [`/articles/${slug}/opengraph-image`] }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();
  const wordCount = (article.intro + " " + article.sections.flatMap(s => [s.heading, ...s.paragraphs]).join(" ")).trim().split(/\s+/).length;
  return (
    <main className="articlePage">
      <header className="portalNav"><Link className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></Link><Link href="/">All health articles →</Link></header>
      <article className="articleContent">
        <span className="eyebrow">{article.category}</span><h1>{article.title}</h1><p className="articleLead">{article.intro}</p>
        <img className="articleCover" src={article.cover} alt={`Editorial illustration for ${article.title}`} width="1200" height="600" />
        <div className="articleMeta">{article.reviewed} • Approximately {wordCount.toLocaleString()} words</div>
        <div className="articleContents"><strong>In this guide</strong><ul>{article.sections.map((section) => <li key={section.heading}><a href={`#${section.heading.split(".")[0].replaceAll(" ", "-")}`}>{section.heading}</a></li>)}</ul></div>
        {article.sections.map((section) => <section id={section.heading.split(".")[0].replaceAll(" ", "-")} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</section>)}
        <aside className="medicalNotice"><strong>Important health notice</strong><p>This article is for general education only. It does not diagnose a condition or provide an individual treatment plan. It does not replace advice from a qualified healthcare professional. For urgent or severe symptoms, seek appropriate medical care.</p></aside>
        <Link className="primary articleBack" href="/">← Back to OCL Health Journal</Link>
      </article>
      <footer><div className="footerBottom">© 2026 OCL Health • Clear information, responsible education.</div></footer>
    </main>
  );
}
