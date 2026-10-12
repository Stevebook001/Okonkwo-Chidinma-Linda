import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const products: Record<string,{name:string;category:string;description:string;image:string;review:string}> = {
 "vitamin-c-1000mg": {name:"Vitamin C 1000mg",category:"Vitamins & Supplements",description:"A catalogue preview for a vitamin product. Final formulation, pack details, registration information, approved claims and seller documentation must be verified before listing or sale.",image:"/products/vitamin-c.svg",review:"Pending product and regulatory verification"},
 "paracetamol": {name:"Paracetamol",category:"Medicine",description:"A catalogue preview only. Product strength, formulation, pack size, registration status, approved label, supplier authorisation and lawful dispensing route must be confirmed before any listing or sale.",image:"/products/paracetamol.svg",review:"Medicine listing locked pending pharmacy compliance review"},
 "antacid-suspension": {name:"Antacid Suspension",category:"Digestive Health",description:"A catalogue preview only. Manufacturer, exact ingredients, pack size, registration details, storage conditions and approved label information must be verified before publication or sale.",image:"/products/antacid.svg",review:"Pending product and regulatory verification"}
};

export async function generateStaticParams(){return Object.keys(products).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const p=products[slug];const title=p? `${p.name} | OCL Health Product Catalogue`:"OCL Health Product Catalogue";
 const description=p?.description??"Product catalogue information from OCL Health.";
 return {title,description,alternates:{canonical:`https://shop.ocl.it.com/products/${slug}`},robots:{index:false,follow:true},openGraph:{title,description,url:`https://shop.ocl.it.com/products/${slug}`,siteName:"OCL Health",type:"website",images:[{url:`/products/${slug}/opengraph-image`,width:1200,height:630,alt:title}]},twitter:{card:"summary_large_image",title,description,images:[`/products/${slug}/opengraph-image`]}};
}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=products[slug];if(!p)notFound();
 return <main className="productDetailPage"><header className="portalNav"><Link className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></Link><Link href="https://shop.ocl.it.com">Catalogue →</Link></header><article className="productDetail"><img src={p.image} alt={`Illustrative catalogue image for ${p.name}`} width="700" height="500"/><div><span className="eyebrow">{p.category.toUpperCase()}</span><h1>{p.name}</h1><p>{p.description}</p><div className="reviewStatus"><strong>Not available to order yet</strong><span>{p.review}</span></div><p className="productSafety">No product price, stock or purchase action is enabled until the exact item, source, registration status, claims, storage and seller authorisation are reviewed. This page is not medical advice.</p><Link className="primary" href="https://support.ocl.it.com">Ask about this listing</Link></div></article><footer><div className="footerBottom">OCL Health • Product information is subject to compliance review.</div></footer></main>;
}
