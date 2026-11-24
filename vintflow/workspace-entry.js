(()=>{
 'use strict';
 // A saved session is a routing hint only. /app/ still verifies owner access server-side.
 if(!['/','/index.html'].includes(location.pathname)||new URLSearchParams(location.search).get('public')==='1')return;
 try{
  const saved=JSON.parse(localStorage.getItem('sb-bwzlnuoncokanwhldglt-auth-token')||'null');
  if(!saved||typeof saved.access_token!=='string'||!saved.access_token)return;
  const target=new URL(location.href);target.pathname='/app/';
  document.documentElement.style.visibility='hidden';
  location.replace(target.href);
 }catch{}
})();
