import { createClient } from "@supabase/supabase-js";
const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request:Request){
 let payload:unknown;try{payload=await request.json()}catch{return Response.json({error:"Invalid request."},{status:400})}
 if(!payload||typeof payload!=="object")return Response.json({error:"Invalid request."},{status:400});
 const body=payload as Record<string,unknown>;const email=typeof body.email==="string"?body.email.trim().toLowerCase():"";const consent=body.consent===true;
 if(!validEmail.test(email)||email.length>254||!consent)return Response.json({error:"Enter a valid email and confirm your subscription consent."},{status:400});
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.SUPABASE_SECRET_KEY;const apiKey=process.env.RESEND_API_KEY;const from=process.env.RESEND_FROM_EMAIL;
 if(!url||!key||!apiKey||!from)return Response.json({error:"Newsletter confirmation is not configured yet. Please try again later."},{status:503});
 const supabase=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const token=crypto.randomUUID();
 const {error}=await supabase.from("newsletter_subscribers").upsert({email,confirmation_token:token,status:"pending",consented_at:new Date().toISOString(),unsubscribed_at:null},{onConflict:"email"});
 if(error){console.error("Newsletter database write failed",error.message);return Response.json({error:"We couldn't save your subscription right now."},{status:502})}
 const confirmUrl=new URL("/api/newsletter/confirm",request.url);confirmUrl.searchParams.set("token",token);
 const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:email,subject:"Confirm your OCL Health newsletter subscription",text:`Please confirm that you want to receive OCL Health updates by opening this link:\n\n${confirmUrl.toString()}\n\nIf you did not request this, ignore this email.`,tags:[{name:"source",value:"ocl-newsletter-confirmation"}]})});
 if(!sent.ok){console.error("Newsletter confirmation email failed",sent.status,(await sent.text()).slice(0,300));return Response.json({error:"We saved your request but couldn't send the confirmation email. Please try again later."},{status:502})}
 return Response.json({ok:true,message:"Please check your inbox and confirm your subscription."},{status:200,headers:{"Cache-Control":"no-store"}});
}
