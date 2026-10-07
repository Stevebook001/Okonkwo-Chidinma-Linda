import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const runtime = "edge";
export const alt = "OCL Health";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const data: Record<string,{name:string;line:string}> = {
  "www.ocl.it.com": {name:"OCL HEALTH",line:"Pharmacy • Chemistry • Wellness"},
  "ocl.it.com": {name:"OCL HEALTH",line:"Pharmacy • Chemistry • Wellness"},
  "blogs.ocl.it.com": {name:"OCL HEALTH BLOG",line:"Health education • Pharmacy • Wellness"},
  "developers.ocl.it.com": {name:"OCL DEVELOPERS",line:"Build with the OCL platform"},
  "docs.ocl.it.com": {name:"OCL DOCS",line:"APIs • SDKs • Webhooks • Guides"},
  "admin.ocl.it.com": {name:"OCL ADMIN",line:"Platform operations"},
  "account.ocl.it.com": {name:"OCL ACCOUNT",line:"Your OCL Health dashboard"},
  "shop.ocl.it.com": {name:"OCL SHOP",line:"Health products and information"},
  "api.ocl.it.com": {name:"OCL API",line:"A programmable health platform"},
  "status.ocl.it.com": {name:"OCL STATUS",line:"Service availability"},
  "support.ocl.it.com": {name:"OCL SUPPORT",line:"Help and product enquiries"}
};

export default async function Image() {
  const host=(await headers()).get("host")?.split(":")[0] ?? "www.ocl.it.com";
  const c=data[host] ?? data["www.ocl.it.com"];
  return new ImageResponse(
    <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"70px",background:"linear-gradient(135deg,#ffffff 0%,#eef8ff 55%,#d9efff 100%)",color:"#08243d",fontFamily:"Arial"}}>
      <div style={{display:"flex",alignItems:"center",gap:"22px"}}>
        <div style={{width:92,height:92,borderRadius:28,display:"flex",alignItems:"center",justifyContent:"center",background:"#0878df",color:"#fff",fontSize:58,fontWeight:800,boxShadow:"0 20px 45px rgba(8,120,223,.25)"}}>✚</div>
        <div style={{fontSize:34,fontWeight:800}}>OCL <span style={{color:"#0878df"}}>Health</span></div>
      </div>
      <div>
        <div style={{fontSize:64,fontWeight:800,letterSpacing:-2}}>{c.name}</div>
        <div style={{fontSize:31,marginTop:18,color:"#49657c"}}>{c.line}</div>
      </div>
      <div style={{fontSize:24,color:"#0878df"}}>{host}</div>
    </div>
  );
}
