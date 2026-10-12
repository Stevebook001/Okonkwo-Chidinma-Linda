const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request:Request){
 let payload:unknown;
 try{payload=await request.json()}catch{return Response.json({error:"Invalid JSON body."},{status:400})}
 if(!payload||typeof payload!=="object")return Response.json({error:"Invalid request."},{status:400});
 const body=payload as Record<string,unknown>;
 const name=typeof body.name==="string"?body.name.trim():"";
 const email=typeof body.email==="string"?body.email.trim():"";
 const subject=typeof body.subject==="string"?body.subject.trim():"Website enquiry";
 const message=typeof body.message==="string"?body.message.trim():"";
 if(name.length<2||name.length>100||!emailPattern.test(email)||email.length>254||message.length<10||message.length>5000||subject.length>160)return Response.json({error:"Please provide a name, valid email, subject and message between 10 and 5,000 characters."},{status:400});
 const apiKey=process.env.RESEND_API_KEY;
 const from=process.env.RESEND_FROM_EMAIL;
 const to=process.env.OCL_SUPPORT_EMAIL;
 if(!apiKey||!from||!to)return Response.json({error:"Contact email is not configured yet. Please try again later."},{status:503});
 const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to,reply_to:email,subject:`OCL website enquiry: ${subject}`,text:`From: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,tags:[{name:"source",value:"ocl-contact-form"}]})});
 if(!response.ok){const error=await response.text();console.error("Resend contact delivery failed",response.status,error.slice(0,500));return Response.json({error:"The message could not be sent right now. Please try again later."},{status:502})}
 return Response.json({ok:true,message:"Your message was sent to the OCL support team."},{status:200,headers:{"Cache-Control":"no-store"}});
}
