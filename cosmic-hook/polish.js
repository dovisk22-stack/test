/* Cosmetic upgrade for existing Cosmic Hook game; no gameplay state is replaced. */
(function(){'use strict';
var byId=function(x){return document.getElementById(x);};
var names=['NOVA EXPLORER','ASTRO BLUE','CRIMSON RIDER','STORM WALKER','RING SENTINEL','SOLAR KNIGHT','DEEP PHANTOM','VOID EMPEROR'];
var colors=[['#a28dff','#24234d','#d5d6ff'],['#6fc5f5','#21446c','#d8f7ff'],['#d86473','#512233','#ffbac1'],['#de9562','#6f3d30','#ffe0be'],['#aca1c9','#4d4167','#efe5ff'],['#e9be6f','#70402b','#fff4ce'],['#63b9da','#183658','#d6f4ff'],['#9d66d8','#281847','#e9bcff']];
function suit(i,kind){
 var col=colors[i]||colors[0],a=col[0],dark=col[1],light=col[2],id='sci'+kind+i;
 return '<svg viewBox="0 0 180 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+names[i]+' armored astronaut" data-premium="1">'+
 '<defs><linearGradient id="'+id+'m" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#78859b"/><stop offset=".3" stop-color="#2e384e"/><stop offset=".68" stop-color="#121a2a"/><stop offset="1" stop-color="#070b16"/></linearGradient>'+
 '<linearGradient id="'+id+'a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+light+'"/><stop offset=".28" stop-color="'+a+'"/><stop offset=".66" stop-color="'+dark+'"/><stop offset="1" stop-color="#0c1121"/></linearGradient>'+
 '<linearGradient id="'+id+'v" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e4f4ff"/><stop offset=".2" stop-color="#5e8399"/><stop offset=".45" stop-color="#183657"/><stop offset="1" stop-color="#060d1e"/></linearGradient></defs>'+
 '<path d="M45 99 L35 111 L38 155 L54 162 L66 122 Z M134 99 L145 111 L142 155 L126 162 L114 122 Z" fill="#0a0e1c" stroke="'+a+'" stroke-width="2"/>'+
 '<path d="M56 144 L78 148 L73 199 L64 211 L46 205 L43 191 Z M102 148 L124 144 L137 191 L134 205 L116 211 L107 199 Z" fill="url(#'+id+'m)" stroke="#77839b" stroke-width="1.5"/>'+
 '<path d="M47 183 L74 183 L69 199 L49 198 Z M106 183 L133 183 L131 198 L111 199 Z" fill="url(#'+id+'a)" stroke="'+light+'" stroke-width="1"/>'+
 '<path d="M46 200 L71 202 L74 215 L67 223 L39 222 L39 211 Z M109 202 L134 200 L141 211 L141 222 L113 223 L106 215 Z" fill="#0e1525" stroke="'+a+'" stroke-width="2"/>'+
 '<path d="M54 95 L126 95 L137 156 L118 174 L62 174 L43 156 Z" fill="#0c1223" stroke="#8d96ae" stroke-width="2"/>'+
 '<path d="M59 118 L121 118 L129 155 L113 169 L67 169 L51 155 Z" fill="url(#'+id+'m)" stroke="#616f87" stroke-width="1.5"/>'+
 '<path d="M70 148 L110 148 L106 163 L74 163 Z" fill="url(#'+id+'a)" stroke="'+light+'" stroke-width="1"/>'+
 '<path d="M28 99 L58 87 L68 106 L51 135 L28 129 L20 115 Z M122 87 L152 99 L160 115 L152 129 L129 135 L112 106 Z" fill="url(#'+id+'a)" stroke="'+light+'" stroke-width="2"/>'+
 '<path d="M25 122 L51 132 L47 163 L36 174 L23 161 Z M129 132 L155 122 L157 161 L144 174 L133 163 Z" fill="url(#'+id+'m)" stroke="'+a+'" stroke-width="2"/>'+
 '<path d="M23 159 L40 165 L42 180 L31 187 L19 175 Z M140 165 L157 159 L161 175 L149 187 L138 180 Z" fill="'+dark+'" stroke="'+light+'" stroke-width="1.5"/>'+
 '<path d="M46 87 L64 78 L116 78 L134 87 L126 130 L105 143 L75 143 L54 130 Z" fill="url(#'+id+'a)" stroke="'+light+'" stroke-width="2"/>'+
 '<path d="M64 93 L116 93 L121 121 L106 133 L74 133 L59 121 Z" fill="url(#'+id+'m)" stroke="#67758c" stroke-width="1"/>'+
 '<path d="M85 93 L95 93 L99 112 L94 120 L86 120 L81 112 Z" fill="'+a+'"/><path d="M90 93 V118 M78 126 H102" stroke="'+light+'" stroke-width="1.7"/>'+
 '<path d="M52 77 L63 39 L90 26 L117 39 L128 77 L113 100 L67 100 Z" fill="#111a2a" stroke="#8998b1" stroke-width="3"/>'+
 '<path d="M60 47 L90 34 L120 47 L123 73 L105 91 L75 91 L57 73 Z" fill="url(#'+id+'a)" stroke="'+light+'" stroke-width="2"/>'+
 '<path d="M64 53 L90 42 L116 53 L116 76 L102 86 L78 86 L64 76 Z" fill="url(#'+id+'v)" stroke="#779bb2" stroke-width="2"/>'+
 '<path d="M69 57 L92 46 L107 52 M58 44 L70 34 L82 32 M98 32 L111 34 L123 44" fill="none" stroke="'+light+'" stroke-width="2.5" opacity=".78"/>'+
 '<path d="M51 75 L42 82 L44 106 M129 75 L138 82 L136 106" fill="none" stroke="#4b5a77" stroke-width="5"/>'+
 '<path d="M60 145 L120 145 M48 190 L70 190 M111 190 L134 190" stroke="#ffffff" opacity=".27" stroke-width="1"/>'+
 '<g fill="'+a+'"><rect x="56" y="107" width="7" height="14"/><rect x="117" y="107" width="7" height="14"/><circle cx="34" cy="131" r="2.5"/><circle cx="146" cy="131" r="2.5"/><circle cx="90" cy="151" r="2.5"/></g></svg>';
}
var menu=byId('homeScreen')&&byId('homeScreen').querySelector('.menu');
if(!menu)return;
var stats=menu.querySelector('.menu-stats'),header=document.createElement('header');
header.className='premium-header';
header.innerHTML='<div class="brand-mark">C//</div><div class="brand-text"><strong>COSMIC HOOK</strong><small>GALAXY OPERATIONS</small></div>';
header.appendChild(stats);
var hero=document.createElement('div');hero.className='cinematic-hero';
hero.innerHTML='<div class="hero-art"><div class="hero-planet"></div><div class="hero-astronaut" id="heroAstronaut">'+suit(0,'hero')+'</div></div>'+
 '<div class="hero-copy"><div class="eyebrow">SEASON 01 · OUTER ORBIT</div><h1>COSMIC<br><em>HOOK</em></h1>'+
 '<p>Master gravity. Swing through eight worlds. Unlock specialist suits with unique powers.</p><div class="hero-kicker">GRAPPLE · SWING · ASCEND</div></div>'+
 '<div class="hero-bottom">MISSION CONTROL ONLINE</div>';
var actions=document.createElement('nav');actions.className='menu-actions';actions.setAttribute('aria-label','Primary game actions');
['playBtn','levelsBtn','skinsBtn','missionsBtn'].forEach(function(id){actions.appendChild(byId(id))});
var head=document.createElement('div');head.className='world-section-head';
head.innerHTML='<div><strong>SELECT DESTINATION</strong><small>Eight planetary worlds. Complete stages to progress.</small></div><div class="right-info">01 — 08</div>';
var strip=document.createElement('nav');strip.className='world-strip';strip.setAttribute('aria-label','Destination shortcuts');
var order=['EARTH','MARS','JUPITER','SATURN','SUN','NEPTUNE','MOON','VOID'];
var existing=Array.prototype.slice.call(menu.querySelectorAll('.menu-world'));
order.forEach(function(name,index){
 var btn=existing.find(function(b){return b.textContent.trim()===name;});
 if(!btn){btn=document.createElement('button');btn.className='menu-tap menu-world';btn.type='button';
  btn.addEventListener('click',function(){byId('levelsBtn').click();requestAnimationFrame(function(){var card=byId('levelGrid').children[index];if(card)card.scrollIntoView({block:'nearest',behavior:'smooth'});});});
 }
 btn.dataset.world=name;btn.setAttribute('aria-label',name+' world. View level requirements.');
 btn.innerHTML='<span class="planet-thumb '+name.toLowerCase()+'" aria-hidden="true"></span><span>'+name+'</span>';
 strip.appendChild(btn);
});
var equipped=byId('menuEquipped'),credit=document.createElement('div');credit.className='cinematic-credit';
credit.innerHTML='COSMIC HOOK • ORIGINAL ARCADE EXPERIENCE • PLANET TEXTURES: <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer">SOLAR SYSTEM SCOPE</a> · CC BY 4.0.';
menu.replaceChildren(header,hero,actions,head,strip,equipped,credit);
function updateWorldLocks(){var n=Number((byId('menuLevel').textContent||'').match(/\d+/)?.[0]||1);for(var i=0;i<strip.children.length;i++){var b=strip.children[i];b.dataset.locked=String(i+1>n);b.title=i+1>n?'Complete level '+i+' to unlock':'Explore '+order[i];}}
updateWorldLocks();
new MutationObserver(updateWorldLocks).observe(byId('menuLevel'),{subtree:true,childList:true,characterData:true});
function updateHero(){var txt=equipped.textContent||'';var i=names.findIndex(function(n){return txt.indexOf(n)>=0;});byId('heroAstronaut').innerHTML=suit(Math.max(0,i),'hero');}
new MutationObserver(updateHero).observe(equipped,{subtree:true,childList:true,characterData:true});
updateHero();
var grid=byId('skinGrid');
function enhanceLocker(){Array.prototype.forEach.call(grid.querySelectorAll('.skin-card'),function(card,i){var old=card.querySelector('svg:not([data-premium])');if(old){var holder=document.createElement('div');holder.innerHTML=suit(i,'locker');old.replaceWith(holder.firstElementChild);}card.title=names[i]+' — special ability and unlocking details';});}
new MutationObserver(enhanceLocker).observe(grid,{subtree:true,childList:true});
var missionList=byId('missionList');
function enhanceMissions(){var data={};try{data=JSON.parse(localStorage.getItem('cosmic-hook-save')||'{}')}catch(e){}
 var progress=[[data.totalWins||0,1],[data.unlocked||1,2],[data.totalCollected||0,15],[data.unlocked||1,4],[data.unlocked||1,5],[data.unlocked||1,8]];
 Array.prototype.forEach.call(missionList.querySelectorAll('.mission-row'),function(row,i){
 if(row.dataset.enhanced)return;row.dataset.enhanced='1';var goal=progress[i]||[0,1],pct=Math.min(100,Math.round(goal[0]/goal[1]*100));
 var body=row.querySelector('span:nth-child(2)');if(!body)return;var bar=document.createElement('div');bar.style.cssText='height:3px;background:#303b53;margin-top:8px;overflow:hidden;border-radius:2px';
 var fill=document.createElement('i');fill.style.cssText='display:block;height:100%;width:'+pct+'%;background:#a48af7';bar.appendChild(fill);body.appendChild(bar);
 row.setAttribute('aria-label',row.querySelector('b')?.textContent+' '+pct+' percent complete');
 });}
new MutationObserver(enhanceMissions).observe(missionList,{childList:true});
})();
