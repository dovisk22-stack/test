import http from 'node:http';
const origin='https://vintflow-ai.onrender.com';
const server=http.createServer((req,res)=>{
const allowed=req.headers.origin===origin;
if(allowed){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS')}
res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data))};
if(req.method==='OPTIONS')return allowed?(res.writeHead(204),res.end()):json(403,{error:'Origin not allowed'});
if(req.url==='/health'&&req.method==='GET')return json(200,{ok:true,configured:false,migrated:true,provider:'supabase'});
if(req.url==='/analyze'&&req.method==='POST')return json(410,{error:'This scan endpoint has been retired. Refresh VintFlow and sign in to use your weekly AI allowance.'});
return json(404,{error:'Not found'});
});
server.listen(Number(process.env.PORT)||10000,'0.0.0.0');