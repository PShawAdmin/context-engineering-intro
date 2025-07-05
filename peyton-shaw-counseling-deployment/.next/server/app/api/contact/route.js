"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3431:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>b,requestAsyncStorage:()=>y,routeModule:()=>w,serverHooks:()=>v,staticGenerationAsyncStorage:()=>f});var o={};r.r(o),r.d(o,{GET:()=>g,POST:()=>h});var n=r(3278),s=r(5002),a=r(4877),i=r(1309);class l extends Error{constructor(e,t){super(e),this.provider=t,this.name="EmailError"}}async function d(e){let t=process.env.SENDGRID_API_KEY;if(!t)throw new l("SendGrid API key not configured","sendgrid");let r={personalizations:[{to:[{email:e.to}]}],from:{email:"no-reply@peytonshawcounseling.com",name:"Peyton Shaw Counseling"},subject:e.subject,content:[{type:e.html?"text/html":"text/plain",value:e.html||e.text||""}],reply_to:e.replyTo?{email:e.replyTo}:void 0};try{let e=await fetch("https://api.sendgrid.com/v3/mail/send",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok){let t=await e.text();throw new l(`SendGrid error: ${e.status} - ${t}`,"sendgrid")}return{success:!0,messageId:e.headers.get("x-message-id")||void 0}}catch(e){if(e instanceof l)throw e;throw new l(`Failed to send email: ${e}`,"sendgrid")}}async function c(e){let t=process.env.RESEND_API_KEY;if(!t)throw new l("Resend API key not configured","resend");let r={from:"Peyton Shaw Counseling <no-reply@peytonshawcounseling.com>",to:e.to,subject:e.subject,text:e.text,html:e.html,reply_to:e.replyTo};try{let e=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok){let t=await e.json();throw new l(`Resend error: ${t.message||e.statusText}`,"resend")}let o=await e.json();return{success:!0,messageId:o.id}}catch(e){if(e instanceof l)throw e;throw new l(`Failed to send email: ${e}`,"resend")}}async function m(e){if(!e.to||!e.subject||!e.text&&!e.html)throw new l("Missing required email fields");let t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(!t.test(e.to))throw new l("Invalid recipient email address");if(e.replyTo&&!t.test(e.replyTo))throw new l("Invalid reply-to email address");if(process.env.SENDGRID_API_KEY)try{return await d(e)}catch(e){console.error("SendGrid failed:",e)}if(process.env.RESEND_API_KEY)try{return await c(e)}catch(e){throw console.error("Resend failed:",e),e}throw new l("No email service configured. Please set SENDGRID_API_KEY or RESEND_API_KEY")}function u(e){let t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return e.replace(/[&<>"']/g,e=>t[e])}let p=new Map;async function h(e){try{let t=e.headers.get("x-forwarded-for")||e.headers.get("x-real-ip")||"unknown",{allowed:r,remaining:o}=function(e){let t=Date.now(),r=p.get(e);return!r||t>r.resetTime?(p.set(e,{count:1,resetTime:t+36e5}),{allowed:!0,remaining:4}):r.count>=5?{allowed:!1,remaining:0}:(r.count++,{allowed:!0,remaining:5-r.count})}(t);if(!r)return i.NextResponse.json({error:"Too many requests. Please try again later."},{status:429,headers:{"X-RateLimit-Limit":"5","X-RateLimit-Remaining":"0","X-RateLimit-Reset":new Date(Date.now()+36e5).toISOString()}});let n=await e.json();if(!n.name||!n.email||!n.message)return i.NextResponse.json({error:"Missing required fields"},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.email))return i.NextResponse.json({error:"Invalid email address"},{status:400});if(n.phone&&!/^[\d\s()+-]*$/.test(n.phone))return i.NextResponse.json({error:"Invalid phone number"},{status:400});let s={name:n.name.trim().slice(0,100),email:n.email.trim().toLowerCase(),phone:n.phone?.trim().slice(0,20),message:n.message.trim().slice(0,1e3)},a=`${s.name} ${s.message}`;if([/\b(viagra|cialis|loans?|credit|casino|lottery|winner)\b/i,/\b(click here|buy now|limited time|act now)\b/i,/(https?:\/\/[^\s]+){3,}/i].some(e=>e.test(a)))return i.NextResponse.json({success:!0},{status:200,headers:{"X-RateLimit-Remaining":o.toString()}});let l=process.env.CONTACT_EMAIL;if(!l)return console.error("CONTACT_EMAIL not configured"),i.NextResponse.json({error:"Contact form is not properly configured"},{status:500});let d=`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #0ea5e9;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #f9fafb;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 5px 5px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #4b5563;
          }
          .value {
            margin-top: 5px;
            padding: 10px;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 3px;
          }
          .message {
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${u(s.name)}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${u(s.email)}</div>
          </div>
          ${s.phone?`
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${u(s.phone)}</div>
          </div>
          `:""}
          <div class="field">
            <div class="label">Message:</div>
            <div class="value message">${u(s.message)}</div>
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            This email was sent from the contact form on peytonshawcounseling.com
          </p>
        </div>
      </body>
    </html>
  `;try{await m({to:l,subject:`New Contact Form Submission from ${s.name}`,html:d,text:`
Name: ${s.name}
Email: ${s.email}
${s.phone?`Phone: ${s.phone}`:""}

Message:
${s.message}
        `.trim(),replyTo:s.email});try{await m({to:s.email,subject:"Thank you for contacting Peyton Shaw Counseling",html:`
            <h2>Thank you for reaching out!</h2>
            <p>I've received your message and will get back to you within 24-48 hours.</p>
            <p>If you need immediate assistance or are experiencing a mental health emergency, please call 911 or go to your nearest emergency room.</p>
            <p>Best regards,<br>Peyton Shaw<br>Peyton Shaw Counseling</p>
          `,text:`Thank you for reaching out!

I've received your message and will get back to you within 24-48 hours.

If you need immediate assistance or are experiencing a mental health emergency, please call 911 or go to your nearest emergency room.

Best regards,
Peyton Shaw
Peyton Shaw Counseling`})}catch(e){console.error("Failed to send auto-reply:",e)}return i.NextResponse.json({success:!0},{status:200,headers:{"X-RateLimit-Remaining":o.toString()}})}catch(e){return console.error("Email send failed:",e),i.NextResponse.json({error:"Failed to send message. Please try again later."},{status:500})}}catch(e){return console.error("Contact form error:",e),i.NextResponse.json({error:"An unexpected error occurred"},{status:500})}}async function g(){return i.NextResponse.json({error:"Method not allowed"},{status:405})}setInterval(()=>{let e=Date.now();p.forEach((t,r)=>{e>t.resetTime&&p.delete(r)})},6e4);let w=new n.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"/mnt/c/Users/james/PSC/context-engineering-intro/peyton-shaw-counseling/app/api/contact/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:y,staticGenerationAsyncStorage:f,serverHooks:v}=w,x="/api/contact/route";function b(){return(0,a.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:f})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[379,833],()=>r(3431));module.exports=o})();