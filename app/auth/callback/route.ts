import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request:NextRequest){
 const {searchParams,origin}=new URL(request.url);
 const code=searchParams.get("code");
 const next=searchParams.get("next")??"/account";
 if(!code)return NextResponse.redirect(new URL("/auth/sign-in?error=missing_code",origin));
 const response=NextResponse.redirect(new URL(next.startsWith("/")&&!next.startsWith("//")?next:"/account",origin));
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)return NextResponse.redirect(new URL("/auth/sign-in?error=auth_not_configured",origin));
 const supabase=createServerClient(url,key,{cookies:{getAll:()=>request.cookies.getAll(),setAll:(cookiesToSet)=>cookiesToSet.forEach(({name,value,options})=>response.cookies.set(name,value,options))}});
 const {error}=await supabase.auth.exchangeCodeForSession(code);
 if(error)return NextResponse.redirect(new URL("/auth/sign-in?error=confirmation_failed",origin));
 return response;
}
