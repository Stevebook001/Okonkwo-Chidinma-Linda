import Link from "next/link";
import { notFound } from "next/navigation";
import AdSenseLoader from "@/app/AdSenseLoader";

type Section = { heading: string; paragraphs: string[] };
type Article = { category: string; title: string; description: string; keywords?: string[]; cover: string; intro: string; sections: Section[]; reviewed: string };

const articles: Record<string, Article> = {
  "read-a-medicine-label": {
    category: "MEDICINE EDUCATION",
    title: "How to read a medicine label safely",
    description: "A practical guide to understanding active ingredients, strengths, directions, warnings, storage and expiry information on medicine labels.",
    keywords: ["how to read a medicine label", "active ingredients", "medicine strength", "medicine warnings", "expiry date"],
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
    keywords: ["questions to ask a pharmacist", "medicine interactions", "pharmacy consultation", "medicine side effects"],
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
    keywords: ["sustainable nutrition habits", "balanced meals", "hydration", "healthy food planning", "nutrition education"],
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
  },

  "storing-medicines-safely": {
    category: "MEDICINE SAFETY",
    title: "How to store medicines safely at home",
    description: "Learn how to read storage instructions, protect medicines from heat and moisture, keep them away from children, and recognise when storage may have affected a product.",
    keywords: ["how to store medicines safely", "medicine storage at home", "medicine safety", "medicine expiry date", "keep medicines away from children"],
    cover: "/blog/medicine-storage.svg",
    intro: "Good medicine storage helps protect product quality and reduces accidental use by children or other household members. The correct conditions depend on the specific product, so the label, leaflet and pharmacist's instructions should always take priority over general rules.",
    reviewed: "OCL Health Editorial • General educational information",
    sections: [
      { heading: "1. Start with the product's own instructions", paragraphs: [
        "There is no single storage rule that fits every medicine. Some products are intended for ordinary room-temperature storage, while others must be protected from light, kept dry or refrigerated. Read the carton, container and patient leaflet when you first receive a product, and ask the dispensing pharmacist if the instructions are missing or unclear.",
        "Do not assume that a medicine is safe simply because it looks normal. Heat, freezing, moisture or light can affect some products without creating an obvious change in colour or smell. If the product has been stored outside its stated conditions, keep it separate from medicines that are known to be in good condition and ask a pharmacist what to do."
      ]},
      { heading: "2. Choose a cool, dry and secure place", paragraphs: [
        "For products that do not require refrigeration, choose a place that stays within the storage range printed on the packaging. Avoid windowsills, direct sunlight, areas near ovens, hot appliances, damp sinks and places where temperatures fluctuate. A high shelf in a dry room may be more suitable than a bathroom cabinet that regularly becomes warm and humid.",
        "Storage should also be practical enough that adults can find the medicine when needed while children and visitors cannot reach it. Use a secure cupboard or lockable container where appropriate, especially in homes where young children may explore drawers and bags. Keep medicines separate from cleaning chemicals, pesticides and household products to reduce mix-ups."
      ]},
      { heading: "3. Keep medicines in their original packaging", paragraphs: [
        "Original packaging helps identify the medicine, strength, expiry date, batch number and instructions. The outer carton may also protect a product from light or include a measuring device or leaflet. Avoid removing labels or combining loose tablets from different containers, because that can make it difficult to identify a medicine later.",
        "If a pharmacist supplies a compliance aid or a different container, follow the instructions provided for that arrangement. Do not transfer medicines into food containers or unlabelled bottles. Keep any measuring device with the product it belongs to and do not use a kitchen spoon to measure liquid medicine."
      ]},
      { heading: "4. Refrigeration needs special care", paragraphs: [
        "Only refrigerate a medicine when its label or a qualified professional says to do so. Some products need a controlled refrigerator range, and others may be damaged by freezing or by contact with the freezer compartment. Do not guess based on the fact that a product is a liquid, injection or herbal preparation.",
        "Keep refrigerated products away from raw food and follow any packaging directions about light protection or upright storage. During a power outage, avoid making a quick decision based only on how cold the fridge feels. Ask a pharmacist or supplier for product-specific advice if the recommended temperature may have been exceeded."
      ]},
      { heading: "5. Check expiry dates and product condition", paragraphs: [
        "Before use, check that the expiry date is readable and has not passed. Follow any additional instruction about how long a product remains usable after opening, because some eye drops, liquids and other preparations have a shorter in-use period. If the opening date matters, record it clearly on the packaging without covering the manufacturer's information.",
        "Do not use products with broken seals, leaking containers, unexpected changes, missing labels or uncertain identity. Never use a medicine simply because it was expensive or because someone else has used it before. If you suspect a product is counterfeit, recalled or damaged, do not pass it to another person; seek advice from a pharmacist or the relevant regulator."
      ]},
      { heading: "6. Travel and transport can change storage conditions", paragraphs: [
        "Plan ahead when travelling with medicines. Keep essential products accessible rather than leaving them in a parked vehicle, where heat can build quickly. For medicines with temperature requirements, ask the pharmacist how to transport them and whether a suitable insulated carrier or other arrangement is needed.",
        "When flying or crossing borders, keep products labelled and carry only what is lawful for the destination and your circumstances. Do not place temperature-sensitive medicines in checked luggage without confirming the conditions are suitable. If travel exposes a product to extreme heat, freezing or prolonged uncertainty, ask a pharmacist before relying on it."
      ]},
      { heading: "7. Prevent accidental ingestion and mix-ups", paragraphs: [
        "Store medicines out of sight and reach of children, ideally in a locked location, and return them there immediately after use. Do not describe medicine as sweets to encourage a child to take it. Keep visitors' bags and medicines away from children's play areas, and avoid leaving tablets on tables or bedside surfaces.",
        "Separate medicines for different household members and keep names and instructions clear. If two products have similar packaging, use the full label rather than colour alone to identify them. If a child may have swallowed a medicine or someone may have taken the wrong product, seek urgent advice from local emergency services or a qualified healthcare professional rather than waiting for symptoms."
      ]},
      { heading: "8. Dispose of unwanted products responsibly", paragraphs: [
        "Do not keep expired or unneeded medicines indefinitely, and do not share leftover prescription medicines with friends or relatives. Ask a pharmacy or local health authority about a suitable take-back or disposal route in your area. Disposal instructions can vary by product, so do not flush medicines or pour them into a drain unless official instructions specifically say to.",
        "Before disposal, check whether the product is subject to a recall or whether a pharmacist needs its packaging details to investigate a concern. Keep unwanted medicines secure until they can be handled safely. This guide is general education only; product-specific storage and disposal advice should come from the label, pharmacist or relevant authority."
      ]}
    ]
  },
  "prepare-for-pharmacist-visit": {
    category: "PHARMACY TIPS",
    title: "How to prepare for a useful pharmacy consultation",
    description: "A practical checklist for preparing medicine lists, explaining concerns, asking questions and following up after speaking with a pharmacist.",
    keywords: ["prepare for pharmacist appointment", "pharmacist consultation questions", "medicine list", "pharmacy advice", "medication review"],
    cover: "/blog/pharmacy-visit.svg",
    intro: "A little preparation can make a pharmacy conversation clearer and more useful. You do not need to know medical terminology: a short list of medicines, a plain-language description of your concern and a few questions can help the pharmacist understand what you need.",
    reviewed: "OCL Health Editorial • General educational information",
    sections: [
      { heading: "1. Decide what you want help with", paragraphs: [
        "Before the visit, write down the main question you want answered. You may need help understanding a label, checking whether instructions are clear, discussing a possible side effect, planning a refill or finding out whether a symptom needs medical assessment. Starting with one main concern can make the conversation more focused.",
        "Describe what happened in everyday language and include when it began, whether it is changing and what you have already tried. Do not feel you must diagnose the problem yourself. If symptoms are severe or rapidly worsening, do not wait for a routine pharmacy consultation; seek appropriate urgent medical care."
      ]},
      { heading: "2. Bring an up-to-date medicine list", paragraphs: [
        "List prescription medicines, over-the-counter products, vitamins, herbal preparations and supplements. Include the product name, strength if known, how you use it and whether it is taken regularly or only occasionally. If a name is difficult to spell, a clear photograph of the label can help the pharmacist identify the exact product.",
        "Include recently stopped medicines when they may relate to the question, and mention allergies or previous reactions. Do not rely on memory alone if you use several products. If you are asking for a family member, explain which details you know directly and which need to be checked with that person or their records."
      ]},
      { heading: "3. Share relevant context and ask privately", paragraphs: [
        "Some advice depends on age, pregnancy or breastfeeding, allergies, existing conditions and other medicines. Share relevant information honestly so the pharmacist can assess the question appropriately. You do not need to disclose unrelated personal details, but withholding a detail that affects medicine safety can make an answer less useful.",
        "If the topic is sensitive, ask whether you can speak in a more private area. You can also write down a question and hand it to the pharmacist if saying it aloud feels difficult. Respectful questions are a normal part of healthcare, and you should not feel pressured to pretend you understand something that remains unclear."
      ]},
      { heading: "4. Ask the questions that matter most", paragraphs: [
        "Useful questions include: What is this medicine for? How should I use it? How long should I continue? What should I do if I miss a dose? Which side effects need urgent attention? Does it interact with anything else I take? How should I store it? What should I do if the product looks damaged or the label differs from the instructions?",
        "Ask the pharmacist to explain unfamiliar words or units. If there are several questions, prioritise the most urgent ones first and write down the answers. The pharmacist may need to check reliable references or contact a prescriber for some issues; a careful answer is better than a rushed guess."
      ]},
      { heading: "5. Confirm what you understood", paragraphs: [
        "Before leaving, repeat the main instructions in your own words: the amount, timing, duration and important precautions. This gives the pharmacist a chance to correct a misunderstanding. Ask for written directions when available, especially if the schedule is complicated or several household members use medicines.",
        "Do not change a prescribed dose or stop an important medicine based only on a general article or another person's experience. If a label conflicts with what you were told, pause and contact the dispensing pharmacy or prescriber to clarify. If you still feel uncertain, ask again rather than guessing."
      ]},
      { heading: "6. Know when follow-up is needed", paragraphs: [
        "Ask whether the concern needs a follow-up visit, a review with the prescriber or a specific time to check progress. Find out who to contact if the medicine is unavailable, a side effect develops or the instructions are difficult to follow. Keep the pharmacy's contact details with your medicine list when practical.",
        "For urgent symptoms, use local emergency services rather than waiting for an email or website reply. For non-urgent concerns, record what changed and when, so you can explain it accurately if you speak to a healthcare professional again. OCL Health provides general information, not an individual consultation or diagnosis."
      ]},
      { heading: "7. Make the next visit easier", paragraphs: [
        "After the consultation, update your medicine list and note any changes that were recommended by your healthcare team. Keep the relevant leaflet and record the date of the discussion. If a medicine is changed or stopped, update the list rather than leaving old information mixed with current instructions.",
        "Preparation does not need to be complicated. A phone note, paper list or folder of labelled product photographs may be enough. Choose a method that protects your privacy and is easy to update. Share the information securely with professionals who need it, not in public comments or untrusted online forms."
      ]}
    ]
  },
  "understanding-supplement-labels": {
    category: "HEALTH LITERACY",
    title: "How to read a vitamin and supplement label",
    description: "Understand ingredient lists, serving sizes, amounts, warnings and marketing claims on vitamin and supplement packaging without assuming natural means safe.",
    keywords: ["how to read supplement labels", "vitamin label explained", "supplement serving size", "supplement safety", "vitamin ingredients"],
    cover: "/blog/supplement-label.svg",
    intro: "Vitamin and supplement packaging can use confident marketing language that makes products seem simpler than they are. Reading the full label helps you understand what is in the container, how the amount is expressed and which warnings or professional checks may matter.",
    reviewed: "OCL Health Editorial • General educational information",
    sections: [
      { heading: "1. Read the full product name and purpose", paragraphs: [
        "Start with the exact name, formulation and intended use shown on the package. Similar product names may contain different ingredients or amounts, and products marketed for the same general purpose are not necessarily interchangeable. Do not choose a supplement based only on a colour, slogan or a familiar brand name.",
        "Be cautious when the front label promises a quick transformation, a guaranteed cure or results for everyone. A supplement label is not a personalised recommendation, and a product's presence in a shop or online catalogue does not prove it is suitable for you. Ask a qualified healthcare professional about a supplement intended to address a symptom or diagnosed condition."
      ]},
      { heading: "2. Check the serving size before comparing amounts", paragraphs: [
        "The amount listed in a nutrition or supplement panel may refer to one tablet, several capsules, a scoop or another serving. Check the serving size before comparing products, because the figures may describe different quantities. Also check how many servings the container contains and whether the directions differ from the amount shown in the panel.",
        "Do not increase the number of tablets simply because the label's amount looks small or because someone online recommends more. Total intake can include other supplements, fortified foods and medicines. If you use several products, a pharmacist or other qualified professional can help you review the combined ingredients and amounts."
      ]},
      { heading: "3. Understand ingredients and units", paragraphs: [
        "Ingredient names may be listed using common names, scientific names or different forms of the same nutrient. Amounts can appear in milligrams, micrograms, international units or other units depending on the ingredient. Read the number and unit together, and do not assume that two different units can be compared without a reliable conversion and context.",
        "Some products contain blends where the quantity of each ingredient is not clearly shown. That can make it harder to compare products or identify possible duplication. If an ingredient or amount is unclear, ask the manufacturer or a qualified professional before use. Avoid products whose label is missing, altered or impossible to read."
      ]},
      { heading: "4. Check warnings and who should seek advice", paragraphs: [
        "Labels may include age limits, allergy warnings, storage instructions and cautions for pregnancy, breastfeeding or certain health conditions. These details matter because supplements can have active effects and may not be suitable for everyone. Do not assume a product is safe simply because it is sold without a prescription or described as natural.",
        "Tell a healthcare professional about medicines and supplements you already use, especially before starting a product for a health concern. Some ingredients can interact with medicines, affect laboratory results or be unsuitable in particular circumstances. If you experience a concerning reaction, seek appropriate medical advice and keep the packaging available for reference."
      ]},
      { heading: "5. Separate evidence from marketing language", paragraphs: [
        "Phrases such as 'advanced formula', 'detox', 'clinically inspired' or 'supports wellness' do not by themselves show that a product has been proven to treat a disease. Look for clear ingredient information and credible evidence relevant to the specific claim. Testimonials and dramatic before-and-after images cannot establish that a product caused a result.",
        "Be especially cautious of claims that a supplement replaces prescribed treatment, guarantees fertility or weight changes, cures a chronic illness or works for every person. Health claims must be truthful and comply with applicable regulatory requirements. If a claim sounds too certain, seek independent professional advice rather than relying on the advertisement."
      ]},
      { heading: "6. Check authenticity, registration and seller information", paragraphs: [
        "Where product registration or authorisation is required, check the relevant official source and confirm that the details match the exact product and formulation. A number printed on a package is not proof on its own; counterfeit sellers can copy legitimate details onto unrelated items. Buy from reputable sources and keep the receipt and packaging.",
        "Avoid products with broken seals, altered dates, missing manufacturer details or packaging that looks inconsistent. If you suspect a product is counterfeit or unsafe, stop using it and seek guidance from a pharmacist or relevant regulator. Do not republish an unverified product claim or certificate as if it were official evidence."
      ]},
      { heading: "7. Keep a record of what you use", paragraphs: [
        "Maintain a list of supplements with their full names, ingredients, amounts and how often you use them. Bring it to appointments alongside your medicine list. This can help a professional identify duplicated ingredients and consider whether the product is relevant to your circumstances.",
        "Review the list when you start or stop a product and check labels when a formula changes. Do not take multiple products with overlapping ingredients without understanding the combined amount. General online information cannot determine what is right for an individual, so use labels as a starting point for a conversation with a qualified professional."
      ]}
    ]
  },
  "safe-use-of-over-the-counter-medicines": {
    category: "MEDICINE EDUCATION",
    title: "Using over-the-counter medicines more safely",
    description: "A safety-first guide to checking active ingredients, following package directions, avoiding duplicate medicines and knowing when professional advice is needed.",
    keywords: ["over the counter medicine safety", "OTC medicine tips", "active ingredients", "medicine label", "ask a pharmacist"],
    cover: "/blog/otc-medicine-safety.svg",
    intro: "Medicines available without a prescription can still cause harm when used incorrectly, combined with similar products or taken by someone for whom they are unsuitable. Reading the label and asking a pharmacist when unsure are important parts of safer self-care.",
    reviewed: "OCL Health Editorial • General educational information",
    sections: [
      { heading: "1. Confirm the exact product and ingredient", paragraphs: [
        "Read the full product name and active ingredients before using an over-the-counter medicine. Products with different brand names may contain the same ingredient, while products with similar names may have different strengths or formulations. Never rely only on packaging colour or a familiar logo to identify a medicine.",
        "Combination products deserve particular care because they may contain several active ingredients in one tablet, sachet or liquid. If you already use another medicine, check for overlap and ask a pharmacist to review the complete list. Do not take two products together simply because they are sold for different symptoms."
      ]},
      { heading: "2. Follow the label and measuring instructions", paragraphs: [
        "Follow the package directions and any specific instructions provided by a pharmacist or prescriber. Check the amount, timing, maximum stated use and any age-related restrictions. Do not take extra doses or use a medicine for longer than directed because symptoms have not improved.",
        "For liquid products, use the measuring device supplied or recommended by a professional rather than a household spoon. If the instructions use unfamiliar units or the label is difficult to read, ask for clarification before use. If the package directions appear inconsistent with a prescription label, pause and contact the dispensing pharmacy."
      ]},
      { heading: "3. Consider personal circumstances", paragraphs: [
        "A medicine that is appropriate for one person may be unsuitable for another. Age, allergies, pregnancy or breastfeeding, medical conditions and other medicines can change the risks. Tell the pharmacist about relevant circumstances before choosing a product, especially if you are buying it for a child or an older adult.",
        "Do not assume that a product is harmless because it is available without a prescription, widely advertised or described as gentle. If you have a long-term condition or use several medicines, professional advice can help you choose a safer option. Do not use someone else's prescription medicine or share your own."
      ]},
      { heading: "4. Understand side effects and interactions", paragraphs: [
        "Read the warnings and patient information leaflet before use. Ask which side effects are common, what activities may be affected and which symptoms require urgent help. Some medicines can cause drowsiness or affect alertness, so follow label warnings about driving and machinery.",
        "Medicines may interact with prescriptions, other non-prescription products, supplements, alcohol or food. An online article cannot reliably check every interaction for an individual. Keep a current list of what you take and ask a pharmacist to review it when starting a new product or when instructions change."
      ]},
      { heading: "5. Know when self-care is not enough", paragraphs: [
        "Some symptoms need assessment rather than repeated trials of different products. Seek professional advice if symptoms are persistent, worsening, unusual or accompanied by warning signs. Severe or rapidly worsening symptoms, difficulty breathing, collapse, severe chest pain or other emergencies require urgent medical care rather than a routine website enquiry.",
        "Do not use medicine to mask a serious symptom or delay needed assessment. If a product does not help as expected, ask a qualified professional what to do next instead of increasing the amount or adding another medicine without checking."
      ]},
      { heading: "6. Store products safely and check dates", paragraphs: [
        "Follow the product's storage instructions, keep it in its labelled packaging and store it securely away from children. Check the expiry date and any shorter period after opening. Do not use a product with an unclear identity, broken seal or signs of damage.",
        "Dispose of unwanted products through an appropriate local pharmacy or health-authority route when available. Do not share leftover medicines with another person, even if the symptoms seem similar. Keep packaging available if you need to report a problem or ask a pharmacist about a suspected reaction."
      ]},
      { heading: "7. Ask a pharmacist before guessing", paragraphs: [
        "If you are uncertain which product to choose, how to use it or whether it can be combined with something else, ask a pharmacist before taking it. Bring the product packaging or a clear photo and list the medicines and supplements you already use. A brief conversation can help identify important cautions.",
        "OCL Health articles provide general educational information, not a diagnosis or personal treatment plan. Product suitability depends on individual circumstances and the exact formulation. Use professional advice for decisions that require an assessment of your health, and seek urgent care when symptoms may be serious."
      ]}
    ]
  },
  "building-a-personal-medicine-list": {
    category: "HEALTH LITERACY",
    title: "How to make a useful personal medicine list",
    description: "Learn what to include in a personal medicine list, how to keep it current, and how it can support safer conversations with healthcare professionals.",
    keywords: ["personal medicine list", "medication list template", "medicine records", "pharmacist medication review", "medicine safety"],
    cover: "/blog/medicine-list.svg",
    intro: "A current medicine list can make healthcare conversations clearer, especially when different professionals or pharmacies are involved. It does not replace medical records, but it gives you a practical way to communicate what you use and what questions you have.",
    reviewed: "OCL Health Editorial • General educational information",
    sections: [
      { heading: "1. Record every product you use", paragraphs: [
        "Include prescription medicines, over-the-counter products, vitamins, herbal preparations and supplements. Add products used only occasionally, such as a pain reliever or allergy medicine, because these may still matter when a professional reviews your treatment. If you are unsure of a name, take a clear photo of the label.",
        "Record the full product name, strength if shown, how you use it and the reason it was recommended when known. Do not guess a dose or invent a reason if you do not know. Mark uncertain details for confirmation with the pharmacist or prescriber."
      ]},
      { heading: "2. Include allergies and previous reactions", paragraphs: [
        "Write down known medicine allergies and describe the reaction as accurately as you can. If the exact product is unknown, record what you remember and tell a professional that the detail needs checking. A list should distinguish a confirmed allergy from an unpleasant effect or a reaction that has not yet been assessed.",
        "If a serious reaction has occurred, make sure the information is shared with your healthcare team and updated in the relevant medical record. Do not rely only on a note stored on a phone if you are receiving urgent care; tell the treating professionals directly."
      ]},
      { heading: "3. Keep the list readable and easy to find", paragraphs: [
        "Choose paper, a phone note or another method you can update reliably. Keep the most important information near the top and use clear wording rather than abbreviations you may later forget. If you print the list, include the date it was last reviewed so others know whether it is current.",
        "Protect the list because it contains personal information. Share it only with people or professionals who need it for your care, and avoid posting it in public forums or sending it through untrusted links. If a caregiver helps maintain it, agree how changes will be checked and recorded."
      ]},
      { heading: "4. Update the list after every change", paragraphs: [
        "When a professional starts, stops or changes a medicine, update your list as soon as practical. Record the change date and who provided the instruction if you know. Keep old information clearly marked as no longer current rather than deleting context that may matter to a future medication review.",
        "If a label, prescription and verbal instruction seem to conflict, do not use the list to choose which one to follow. Contact the dispensing pharmacy or prescriber for clarification. A medicine list is a communication aid, not an authority to change treatment on your own."
      ]},
      { heading: "5. Bring it to appointments and pharmacy visits", paragraphs: [
        "Take the list when visiting a doctor, pharmacist, hospital or another healthcare service. It can help professionals check for duplicate ingredients, potential interactions and practical problems with a schedule. Tell them if any item on the list is outdated or if you have started something that is not recorded.",
        "If you are supporting another adult, respect their privacy and involve them in maintaining the information whenever possible. For children or people who need a caregiver's help, make sure the responsible professional can confirm details with an appropriate person. Do not share more information than is needed for the question."
      ]},
      { heading: "6. Use the list to ask better questions", paragraphs: [
        "A list can help you ask whether two products contain the same ingredient, what to do if a dose is missed, which warnings matter and whether the storage instructions are clear. You can also note questions beside the relevant medicine and tick them off after a consultation.",
        "Do not use a medicine list from a friend or the internet as a dosing guide. Medicines and schedules are individual, and the correct advice depends on the exact product and personal circumstances. Ask a qualified professional when an instruction is uncertain or a concern is new."
      ]},
      { heading: "7. Make a simple review routine", paragraphs: [
        "Set a reminder to check the list at a practical interval and whenever your medicines change. Compare it with the actual packaging you use at home, because memory and old notes can drift. Remove duplicates only after checking that they are not different formulations or instructions for separate situations.",
        "A short, accurate list is more useful than a complicated record filled with guesses. Start with what you know, mark what needs confirmation and ask a pharmacist or prescriber to help resolve uncertainties. OCL Health offers general education only and cannot verify an individual's medicine regimen."
      ]}
    ]
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
    description: article?.description ?? "Health education from OCL Health.",
    keywords: article?.keywords ?? ["OCL Health", "pharmacy", "health education"],
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
      <AdSenseLoader clientId={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} />
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
