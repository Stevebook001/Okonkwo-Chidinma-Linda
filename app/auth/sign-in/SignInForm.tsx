"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignInForm(){
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setMessage("");setBusy(true);
  try{const supabase=createClient();const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;window.location.assign("/account");}
  catch(e){setMessage(e instanceof Error?e.message:"Sign-in is not available yet. Please try again later.");}finally{setBusy(false);}
 }
 return <form className="authForm" onSubmit={submit}><label>Email address<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={254}/></label><label>Password<input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary" disabled={busy}>{busy?"Signing in…":"Sign in"}</button>{message&&<p role="alert" className="authMessage">{message}</p>}<p>New to OCL? <Link href="/auth/sign-up">Create an account</Link></p></form>;
}
