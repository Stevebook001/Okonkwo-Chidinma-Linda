import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
export const runtime = "nodejs";
export const size={width:1200,height:630};
export const contentType="image/png";
const products:Record<string,{name:string;category:string}>={
 "vitamin-c-1000mg":{name:"Vitamin C 1000mg",category:"VITAMINS & SUPPLEMENTS"},
 "paracetamol":{name:"Paracetamol",category:"MEDICINE CATALOGUE"},
 "antacid-suspension":{name:"Antacid Suspension",category:"DIGESTIVE HEALTH"}
};
export default async function Image({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;const p=products[slug];if(!p)notFound();
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"70px",background:"linear-gradient(135deg,#fff 0%,#eff8ff 58%,#cceaff 100%)",color:"#08243d",fontFamily:"Arial"}}><div style={{display:"flex",alignItems:"center",gap:20}}><div style={{width:80,height:80,borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",background:"#0878df",color:"#fff",fontSize:50}}>✚</div><div style={{fontSize:34,fontWeight:800}}>OCL <span style={{color:"#0878df"}}>Health</span></div></div><div style={{display:"flex",flexDirection:"column",gap:20}}><div style={{fontSize:24,color:"#0878df",fontWeight:700,letterSpacing:3}}>{p.category}</div><div style={{fontSize:62,fontWeight:800,lineHeight:1.1}}>{p.name}</div><div style={{fontSize:26,color:"#49657c"}}>Product catalogue • Compliance review required</div></div><div style={{fontSize:23,color:"#0878df"}}>shop.ocl.it.com</div></div>,size);
}
