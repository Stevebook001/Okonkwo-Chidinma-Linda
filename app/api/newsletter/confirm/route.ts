import { createClient } from "@supabase/supabase-js";
export async function GET(request:Request){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.SUPABASE_SECRET_KEY;const token=new URL(request.url).searchParams.get("token");
 if(!url||!key||!token||token.length>100)return new Response("Invalid or expired confirmation link.",{status:400});
 const supabase=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await supabase.from("newsletter_subscribers").update({status:"active",confirmed_at:new Date().toISOString(),confirmation_token:null}).eq("confirmation_token",token).eq("status","pending").select("id").maybeSingle();
 if(error||!data)return new Response("This confirmation link is invalid, expired, or already used.",{status:400,headers:{"Cache-Control":"no-store"}});
 return Response.redirect(new URL("/?newsletter=confirmed",request.url),303);
}
