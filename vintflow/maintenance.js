"use strict";
const conf={"url":"https://bwzlnuoncokanwhldglt.supabase.co","key":"sb_publishable_vmWCUKJ7pJw1fcjkbffSLQ_p06fDVox","google":false}, storageKey="sb-"+new URL(conf.url).hostname.split(".")[0]+"-auth-token";
const form=document.getElementById("owner-form"),msg=document.getElementById("owner-status"),btn=document.getElementById("owner-submit"),password=document.getElementById("owner-password");
let busy=false;
function message(t){msg.textContent=t}
async function request(path,body,token){const r=await fetch(conf.url+path,{method:"POST",headers:{apikey:conf.key,Authorization:"Bearer "+(token||conf.key),"Content-Type":"application/json"},body:JSON.stringify(body),cache:"no-store"});let data;try{data=await r.json()}catch{data={}}return {status:r.status,data}}
async function unlock(session,allowRefresh=true){
if(!session?.access_token)return false;
let x=await request("/functions/v1/vintflow-maintenance-app",{},session.access_token);
if(x.status===401&&allowRefresh&&session.refresh_token){const refreshed=await request("/auth/v1/token?grant_type=refresh_token",{refresh_token:session.refresh_token});if(refreshed.status!==200)return false;session=refreshed.data;x=await request("/functions/v1/vintflow-maintenance-app",{},session.access_token)}
if(x.status!==200||typeof x.data.html!=="string"||!x.data.html.includes('id="vf-auth-config"'))return false;
if(!session.expires_at&&session.expires_in)session.expires_at=Math.floor(Date.now()/1000)+session.expires_in;
localStorage.setItem(storageKey,JSON.stringify(session));
if(location.pathname!=="/"&&location.pathname!=="/index.html"){location.replace("/");return true}
document.open();document.write(x.data.html);document.close();return true;
}
form.addEventListener("submit",async e=>{e.preventDefault();if(busy)return;busy=true;btn.disabled=true;message("Checking owner access…");try{const x=await request("/auth/v1/token?grant_type=password",{email:document.getElementById("owner-email").value.trim(),password:password.value});password.value="";if(x.status!==200||!await unlock(x.data,false))message("This account cannot access VintFlow during maintenance.")}catch{message("Owner access is temporarily unavailable. Please try again.")}finally{busy=false;btn.disabled=false}});
(async()=>{try{const session=JSON.parse(localStorage.getItem(storageKey)||"null");if(session?.access_token){busy=true;btn.disabled=true;await unlock(session)}}catch{}finally{busy=false;btn.disabled=false}})();
