import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const policies: Record<string,string> = {
 privacy:"Privacy Policy",terms:"Terms of Service",refund:"Refund, Cancellation and Returns Policy",
 "drug-policy":"Drug and Regulated Products Policy","kedi-seller-policy":"Kedi Healthcare Seller Compliance Policy",
 "code-of-conduct":"Code of Conduct",ads:"Advertising Policy","medical-disclaimer":"Medical Disclaimer"
};
export default async function Image({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params; const title=policies[slug]; if(!title) notFound();
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"70px",background:"linear-gradient(135deg,#fff 0%,#eef8ff 60%,#d9efff 100%)",color:"#08243d",fontFamily:"Arial"}}><div style={{display:"flex",alignItems:"center",gap:20}}><div style={{width:80,height:80,borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",background:"#0878df",color:"white",fontSize:50}}>✚</div><div style={{fontSize:34,fontWeight:800}}>OCL <span style={{color:"#0878df"}}>Health</span></div></div><div style={{display:"flex",flexDirection:"column",gap:18}}><div style={{fontSize:23,color:"#0878df",fontWeight:700,letterSpacing:4}}>POLICY CENTRE</div><div style={{fontSize:56,fontWeight:800,lineHeight:1.1}}>{title}</div><div style={{fontSize:26,color:"#49657c"}}>Safety • Transparency • Responsible service</div></div><div style={{fontSize:23,color:"#0878df"}}>ocl.it.com/legal/{slug}</div></div>,size);
}
