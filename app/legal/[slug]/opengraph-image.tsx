import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const policies: Record<string,{title:string;category:string}> = {
 privacy:{title:"Privacy Policy",category:"PRIVACY & DATA"},
 terms:{title:"Terms of Service",category:"PLATFORM POLICIES"},
 refund:{title:"Refund, Cancellation and Returns",category:"CUSTOMER SUPPORT"},
 "drug-policy":{title:"Drug and Regulated Products Policy",category:"PRODUCT SAFETY"},
 "kedi-seller-policy":{title:"Kedi Healthcare Seller Compliance",category:"SELLER COMPLIANCE"},
 "code-of-conduct":{title:"Code of Conduct",category:"COMMUNITY STANDARDS"},
 ads:{title:"Advertising Policy",category:"ADVERTISING"},
 "medical-disclaimer":{title:"Medical Disclaimer",category:"HEALTH INFORMATION"}
};
export default async function Image({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;const p=policies[slug]??{title:"OCL Health Policy",category:"OCL HEALTH"};
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"66px",background:"linear-gradient(135deg,#ffffff 0%,#eef8ff 58%,#cdeaff 100%)",color:"#08243d",fontFamily:"Arial,sans-serif"}}>
 <div style={{display:"flex",alignItems:"center",gap:"20px"}}><div style={{display:"flex",width:"76px",height:"76px",borderRadius:"22px",alignItems:"center",justifyContent:"center",background:"#0878df",color:"#fff",fontSize:"28px",fontWeight:800}}>OCL</div><div style={{display:"flex",fontSize:"32px",fontWeight:800}}>OCL Health</div></div>
 <div style={{display:"flex",flexDirection:"column",gap:"18px"}}><div style={{display:"flex",fontSize:"22px",color:"#0878df",fontWeight:800,letterSpacing:"3px"}}>{p.category}</div><div style={{display:"flex",fontSize:"58px",lineHeight:1.1,fontWeight:800}}>{p.title}</div><div style={{display:"flex",fontSize:"25px",color:"#49657c"}}>Safety, transparency and responsible service.</div></div>
 <div style={{display:"flex",justifyContent:"space-between",fontSize:"22px",color:"#0878df"}}><div style={{display:"flex"}}>ocl.it.com</div><div style={{display:"flex"}}>OCL Health · GitHub</div></div>
 </div>,{...size,headers:{"Cache-Control":"public, max-age=3600, s-maxage=86400"}});
}