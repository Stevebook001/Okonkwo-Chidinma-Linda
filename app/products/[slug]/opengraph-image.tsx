import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const products: Record<string,{title:string;category:string}> = {
 "vitamin-c-1000mg":{title:"Vitamin C 1000mg",category:"VITAMINS & SUPPLEMENTS"},
 "paracetamol":{title:"Paracetamol",category:"MEDICINE CATALOGUE"},
 "antacid-suspension":{title:"Antacid Suspension",category:"DIGESTIVE HEALTH"}
};
export default async function Image({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;const p=products[slug];if(!p)notFound();
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"66px",background:"linear-gradient(135deg,#ffffff 0%,#eef8ff 58%,#cdeaff 100%)",color:"#08243d",fontFamily:"Arial,sans-serif"}}>
 <div style={{display:"flex",alignItems:"center",gap:"20px"}}><div style={{display:"flex",width:"76px",height:"76px",borderRadius:"22px",alignItems:"center",justifyContent:"center",background:"#0878df",color:"#fff",fontSize:"28px",fontWeight:800}}>OCL</div><div style={{display:"flex",fontSize:"32px",fontWeight:800}}>OCL Health</div></div>
 <div style={{display:"flex",flexDirection:"column",gap:"18px"}}><div style={{display:"flex",fontSize:"22px",color:"#0878df",fontWeight:800,letterSpacing:"3px"}}>{p.category}</div><div style={{display:"flex",fontSize:"58px",lineHeight:1.1,fontWeight:800}}>{p.title}</div><div style={{display:"flex",fontSize:"25px",color:"#49657c"}}>Verified information. Responsible health education.</div></div>
 <div style={{display:"flex",justifyContent:"space-between",fontSize:"22px",color:"#0878df"}}><div style={{display:"flex"}}>shop.ocl.it.com</div><div style={{display:"flex"}}>OCL Health · GitHub</div></div>
 </div>,{...size,headers:{"Cache-Control":"public, max-age=3600, s-maxage=86400"}});
}