import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const articles: Record<string,{title:string;category:string}> = {
 "read-a-medicine-label": {title:"How to read a medicine label safely",category:"MEDICINE EDUCATION"},
 "questions-for-your-pharmacist": {title:"Questions to ask your pharmacist",category:"PHARMACY TIPS"},
 "sustainable-nutrition-habits": {title:"Building sustainable nutrition habits",category:"EVERYDAY WELLNESS"}
};
export default async function Image({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params; const a=articles[slug]; if(!a) notFound();
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"66px",background:"linear-gradient(135deg,#fff 0%,#eff8ff 56%,#cceaff 100%)",color:"#08243d",fontFamily:"Arial"}}><div style={{display:"flex",alignItems:"center",gap:20}}><div style={{width:78,height:78,borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",background:"#0878df",color:"white",fontSize:48}}>✚</div><div style={{fontSize:32,fontWeight:800}}>OCL <span style={{color:"#0878df"}}>Health</span></div></div><div style={{display:"flex",flexDirection:"column",gap:18}}><div style={{fontSize:22,color:"#0878df",fontWeight:700,letterSpacing:3}}>{a.category}</div><div style={{fontSize:58,fontWeight:800,lineHeight:1.12,letterSpacing:-1}}>{a.title}</div><div style={{fontSize:25,color:"#49657c"}}>Clear information. Responsible health education.</div></div><div style={{fontSize:22,color:"#0878df"}}>blogs.ocl.it.com</div></div>,size);
}
