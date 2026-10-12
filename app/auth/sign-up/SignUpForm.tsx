"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignUpForm(){
 const [name,setName]=useState("");const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setMessage("");setBusy(true);
  try{const supabase=createClient();const {error}=await supabase.auth.signUp({email,password,options:{data:{display_name:name},emailRedirectTo:`${window.location.origin}/auth/callback?next=/account`}});if(error)throw error;setMessage("If the account details are accepted, check your inbox for the confirmation email before signing in.");}
  catch(e){setMessage(e instanceof Error?e.message:"Sign-up is not available yet. Please try again later.");}finally{setBusy(false);}
 }
 return <form className="authForm" onSubmit={submit}><label>Full name<input required autoComplete="name" value={name} onChange={e=>setName(e.target.value)} maxLength={100}/></label><label>Email address<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={254}/></label><label>Password<input required type="password" autoComplete="new-password" minLength={10} value={password} onChange={e=>setPassword(e.target.value)}/><small>Use at least 10 characters.</small></label><button className="primary" disabled={busy}>{busy?"Creating account…":"Create account"}</button>{message&&<p role="status" className="authMessage">{message}</p>}<p>Already registered? <Link href="/auth/sign-in">Sign in</Link></p></form>;
}
