(()=>{
"use strict";
const conf={"url":"https://bwzlnuoncokanwhldglt.supabase.co","key":"sb_publishable_vmWCUKJ7pJw1fcjkbffSLQ_p06fDVox","google":false}, storageKey="sb-"+new URL(conf.url).hostname.split(".")[0]+"-auth-token";
const form=document.getElementById("owner-form"),msg=document.getElementById("owner-status"),btn=document.getElementById("owner-submit"),password=document.getElementById("owner-password"),email=document.getElementById("owner-email"),continueButton=document.getElementById("owner-continue");
if(!form||!msg||!btn||!password||!email)return;
let busy=false;
const workspaceRoute=["/app/","/app/index.html"].includes(location.pathname);
function savedSession(){try{const s=JSON.parse(localStorage.getItem(storageKey)||"null");return typeof s?.access_token==="string"&&s.access_token?s:null}catch{return null}}
function message(t){msg.textContent=t}
function captchaToken(){return form.querySelector('input[name="cf-turnstile-response"]')?.value||""}
function resetHumanCheck(){try{window.turnstile?.reset("#owner-human-check")}catch{}}
function working(value){busy=value;form.setAttribute("aria-busy",String(value));btn.disabled=value;if(continueButton)continueButton.disabled=value}
async function request(path,body,token){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
 try{
  const headers={apikey:conf.key,"Content-Type":"application/json"};
  if(token)headers.Authorization="Bearer "+token;
  const r=await fetch(conf.url+path,{method:"POST",headers,body:JSON.stringify(body),cache:"no-store",signal:controller.signal});
  let data;try{data=await r.json()}catch(e){if(controller.signal.aborted)throw e;data={}}
  return {status:r.status,data};
 }finally{clearTimeout(timer)}
}
function explanation(status,stage){
 if(status===429)return "Too many requests. Please try again shortly.";
 if(status>=500)return "The workspace service is temporarily unavailable. Please try again.";
 if(stage==="signin"&&(status===400||status===401))return "Sign-in failed. Check your email and password.";
 if(status===401)return "Your session has expired. Sign in again.";
 if(status===403)return "This account cannot access the private workspace.";
 return "Owner access could not be completed. Please try again or contact support.";
}
function persist(session){
 if(!session.expires_at&&session.expires_in)session.expires_at=Math.floor(Date.now()/1000)+session.expires_in;
 try{localStorage.setItem(storageKey,JSON.stringify(session));return true}catch{return false}
}
async function unlock(session,allowRefresh=true){
 if(!session?.access_token){message("Sign in with your owner account.");return false}
 let x=await request("/functions/v1/vintflow-maintenance-app",{},session.access_token);
 if(x.status===401&&allowRefresh&&session.refresh_token){
  const refreshed=await request("/auth/v1/token?grant_type=refresh_token",{refresh_token:session.refresh_token});
  if(refreshed.status!==200){message(explanation(refreshed.status===400?401:refreshed.status,"session"));return false}
  session=refreshed.data;
  if(!session?.access_token){message("Your saved session could not be refreshed. Sign in again.");return false}
  x=await request("/functions/v1/vintflow-maintenance-app",{},session.access_token);
 }
 if(x.status!==200){message(explanation(x.status,"workspace"));return false}
 if(typeof x.data.html!=="string"||!x.data.html.includes('id="vf-auth-config"')){message("The workspace returned an unexpected response. Please contact support.");return false}
 if(!persist(session)){message("Your browser is blocking session storage. Allow site storage and try again.");return false}
 if(!workspaceRoute){const target=new URL(location.href);target.pathname="/app/";target.hash="";target.searchParams.delete("public");location.assign(target.href);return true}
 try{history.replaceState(null,"",location.pathname+location.search)}catch{}
 window.scrollTo(0,0);document.open();document.write(x.data.html.replace("script-src ", "script-src 'sha256-Zk2M6I769aiAFq12N1A1EXYkBLbKwRGZKSudUoVBf+I=' ").replace("</head>", '<link rel="stylesheet" href="/ambient.css?v=atelier-1"><link rel="stylesheet" href="/workspace-lookbook.css?v=atelier-1"><script integrity="sha256-Zk2M6I769aiAFq12N1A1EXYkBLbKwRGZKSudUoVBf+I=" defer src="/workspace-presentation.js?v=atelier-1"></script></head>'));document.close();window.scrollTo(0,0);return true;
}
function networkError(e){message(e?.name==="AbortError"?"The request timed out. Your account has not been changed. Please try again.":"Unable to connect to the workspace. Check your internet connection and try again.")}
form.addEventListener("submit",async e=>{
 e.preventDefault();if(busy)return;working(true);message("Checking owner access…");
 try{const x=await request("/auth/v1/token?grant_type=password",{email:email.value.trim(),password:password.value,...(captchaToken()?{gotrue_meta_security:{captcha_token:captchaToken()}}:{})});password.value="";if(x.status!==200){message(x.data?.error_code==="captcha_failed"?"Complete the security check and try again.":explanation(x.status,"signin"));return}await unlock(x.data,false)}
 catch(e){networkError(e)}finally{password.value="";resetHumanCheck();working(false)}
});
async function continueSaved(){
 if(busy)return;const session=savedSession();if(!session){message("Sign in with your owner account.");if(continueButton)continueButton.hidden=true;return}
 working(true);message("Opening your workspace…");
 try{await unlock(session)}catch(e){networkError(e)}finally{working(false)}
}
if(continueButton){continueButton.hidden=!savedSession();continueButton.addEventListener("click",continueSaved)}
document.querySelectorAll(".vf-mobile-menu").forEach(menu => {
 const summary = menu.querySelector("summary");
 document.addEventListener("pointerdown", event => {
  if (menu.open && !menu.contains(event.target)) menu.open = false;
 });
 document.addEventListener("focusin", event => {
  if (menu.open && !menu.contains(event.target)) menu.open = false;
 });
 menu.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.open) {
   event.preventDefault();
   menu.open = false;
   summary.focus();
  }
 });
});
if(workspaceRoute){
 const loading=document.getElementById("workspace-loading");
 if(savedSession()){
  form.hidden=true;
  continueSaved().finally(()=>{if(document.getElementById("owner-form")){form.hidden=false;if(loading)loading.hidden=true}});
 }else{form.hidden=false;if(loading)loading.hidden=true;}
}
})();
