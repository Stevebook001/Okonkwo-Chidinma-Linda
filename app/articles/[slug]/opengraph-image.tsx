import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const articles: Record<string,{title:string;category:string}> = {
 "read-a-medicine-label": {title:"How to read a medicine label safely",category:"MEDICINE EDUCATION"},
 "questions-for-your-pharmacist": {title:"Questions to ask your pharmacist",category:"PHARMACY TIPS"},
 "sustainable-nutrition-habits": {title:"Building sustainable nutrition habits",category:"EVERYDAY WELLNESS"},
 "storing-medicines-safely": {title:"How to store medicines safely at home",category:"MEDICINE SAFETY"},
 "prepare-for-pharmacist-visit": {title:"Prepare for a useful pharmacy consultation",category:"PHARMACY TIPS"},
 "understanding-supplement-labels": {title:"How to read a vitamin and supplement label",category:"HEALTH LITERACY"},
 "safe-use-of-over-the-counter-medicines": {title:"Using over-the-counter medicines more safely",category:"MEDICINE EDUCATION"},
 "building-a-personal-medicine-list": {title:"How to make a useful personal medicine list",category:"HEALTH LITERACY"}
};
export default async function Image({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params; const a=articles[slug]; if(!a)notFound();
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"66px",background:"linear-gradient(135deg,#ffffff 0%,#eef8ff 58%,#cdeaff 100%)",color:"#08243d",fontFamily:"Arial,sans-serif"}}>
 <div style={{display:"flex",alignItems:"center",gap:"20px"}}><div style={{display:"flex",width:"76px",height:"76px",borderRadius:"22px",alignItems:"center",justifyContent:"center",background:"#0878df",color:"#fff",fontSize:"28px",fontWeight:800}}>OCL</div><div style={{display:"flex",fontSize:"32px",fontWeight:800}}>OCL Health</div></div>
 <div style={{display:"flex",flexDirection:"column",gap:"18px"}}><div style={{display:"flex",fontSize:"22px",color:"#0878df",fontWeight:800,letterSpacing:"3px"}}>{a.category}</div><div style={{display:"flex",fontSize:"55px",lineHeight:1.1,fontWeight:800,letterSpacing:"-1px"}}>{a.title}</div><div style={{display:"flex",fontSize:"25px",color:"#49657c"}}>Clear information. Responsible health education.</div></div>
 <div style={{display:"flex",justifyContent:"space-between",fontSize:"22px",color:"#0878df"}}><div style={{display:"flex"}}>blogs.ocl.it.com</div><div style={{display:"flex"}}>OCL Health · GitHub</div></div>
 </div>,{...size,headers:{"Cache-Control":"public, max-age=3600, s-maxage=86400"}});
}