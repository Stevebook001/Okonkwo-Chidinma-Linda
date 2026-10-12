"use client";
import { FormEvent, useState } from "react";
export default function NewsletterForm(){
 const [email,setEmail]=useState("");const [consent,setConsent]=useState(false);const [status,setStatus]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setStatus("");try{const r=await fetch("/api/newsletter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,consent})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Subscription could not be started.");setStatus(d.message||"Check your inbox to confirm your subscription.");setEmail("");setConsent(false);}catch(err){setStatus(err instanceof Error?err.message:"Unable to subscribe right now.");}finally{setBusy(false);}}
 return <form className="newsletterForm" onSubmit={submit}><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" maxLength={254}/><label className="consentLine"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)}/> I agree to receive OCL Health updates and can unsubscribe later.</label><button type="submit" disabled={busy}>{busy?"Joining…":"Join newsletter"}</button>{status&&<p role="status" className="formStatus">{status}</p>}</form>;
}
