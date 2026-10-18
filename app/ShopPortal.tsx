import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

type Product = { id:string; name:string; slug:string; category:string; description:string; image_url:string|null; price_minor:number|null; currency:string; stock_quantity:number; status:string; kedi_product:boolean; keywords:string[]|null };

export default async function ShopPortal() {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.SUPABASE_SECRET_KEY;
  let products:Product[]=[];
  let error="";
  if(url&&key){
    const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
    const {data,error:dbError}=await db.from("products").select("id,name,slug,category,description,image_url,price_minor,currency,stock_quantity,status,kedi_product,keywords").in("status",["active","pending_review"]).eq("prescription_required",false).order("created_at",{ascending:false}).limit(100);
    if(dbError)error="The catalogue could not be loaded. Please contact OCL support.";
    else products=(data??[]) as Product[];
  } else error="Catalogue database is not configured yet.";
  return <main className="shopPage">
    <header className="nav"><a className="brand" href="https://ocl.it.com"><span className="brandMark">✚</span><span>OCL <b>Health</b></span></a><nav><a href="https://blogs.ocl.it.com">Health blog</a><a href="https://docs.ocl.it.com">Help & docs</a><a className="navButton" href="https://account.ocl.it.com/auth/sign-in">Sign in</a></nav></header>
    <section className="shopHero"><span className="eyebrow">OCL HEALTH MARKETPLACE</span><h1>Health and wellness products, with clearer information.</h1><p>Browse catalogue records from the OCL team. Product images marked as illustrations are not photographs of retail packaging. Prices and availability must be confirmed with the seller before purchase.</p><div className="shopTrust"><span>✓ Seller confirmation</span><span>✓ Clear product information</span><span>✓ No unverified medical promises</span></div></section>
    <section className="shopCatalog"><div className="shopCatalogHead"><div><span className="eyebrow">CATALOGUE</span><h2>Products and availability</h2><p>{products.length} catalogue records · Prices shown are reference prices, not a binding offer.</p></div><a className="secondary" href="mailto:me.ocl.it.com@gmail.com?subject=OCL%20product%20enquiry">Ask about a product</a></div>
    {error&&<p className="privateNotice">{error}</p>}
    {!products.length&&!error&&<p className="privateNotice">The catalogue is being reviewed. Please check back soon.</p>}
    <div className="shopProductGrid">{products.map(p=><article className="shopProduct" key={p.id}><Link className="shopProductImage" href={"/catalog/"+p.slug}><img src={p.image_url||"/products/catalogue-default.svg"} alt={p.kedi_product?"Reference product image for "+p.name:"Illustrative catalogue artwork for "+p.name}/><span>{p.kedi_product?"REFERENCE IMAGE":"ILLUSTRATION"}</span></Link><div className="shopProductBody"><span className="shopCategory">{p.category}</span><h3><Link href={"/catalog/"+p.slug}>{p.name}</Link></h3><p>{p.description}</p><strong>{p.price_minor===null?"Price to be confirmed":"₦"+(p.price_minor/100).toLocaleString("en-NG")}</strong><small>Public listing reference only · confirm the current seller price</small><span className={"shopStatus "+(p.status==="active"&&p.stock_quantity>0?"ready":"pending")}>{p.status==="active"&&p.stock_quantity>0?"Available to enquire":"Pending seller verification"}</span><a className="shopEnquire" href={"mailto:me.ocl.it.com@gmail.com?subject="+encodeURIComponent("OCL availability: "+p.name)+"&body="+encodeURIComponent("Hello OCL Health, please confirm the current price, stock and packaging for "+p.name+".")}>Confirm price & stock →</a></div></article>)}</div>
    <p className="shopDisclaimer">Health products are not suitable for everyone. Check the original product label and consult a qualified pharmacist or healthcare professional where appropriate. This catalogue does not diagnose conditions or promise treatment outcomes. Orders and payment are not enabled for listings awaiting seller verification.</p></section>
    <footer className="shopFooter"><a href="https://ocl.it.com/legal/privacy">Privacy</a><a href="https://ocl.it.com/legal/terms">Terms</a><a href="https://ocl.it.com/legal/refund">Returns & refunds</a><a href="https://ocl.it.com/legal/medical-disclaimer">Medical disclaimer</a><a href="https://github.com/Stevebook001/Okonkwo-Chidinma-Linda" target="_blank" rel="noreferrer">GitHub ↗</a><span>© 2026 OCL Health</span></footer>
  </main>;
}
