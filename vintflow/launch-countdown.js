(()=>{"use strict";function remaining(now,end){const seconds=Math.max(0,Math.ceil((end-now)/1000));return {days:Math.floor(seconds/86400),hours:Math.floor(seconds/3600)%24,minutes:Math.floor(seconds/60)%60,seconds:seconds%60,ended:seconds===0}}
const end=Date.parse("2026-11-23T16:00:00Z"),timer=document.getElementById("vf-launch-countdown"),status=document.getElementById("vf-countdown-status");
if(!timer||!status)return;
const units=["days","hours","minutes","seconds"],fields=Object.fromEntries(units.map(u=>[u,document.getElementById("vf-countdown-"+u)]));
let interval=null;
function render(){const left=remaining(Date.now(),end);for(const u of units){const value=String(left[u]).padStart(2,"0");if(fields[u].textContent!==value)fields[u].textContent=value;}timer.setAttribute("aria-label",left.days+" days, "+left.hours+" hours, "+left.minutes+" minutes and "+left.seconds+" seconds until planned launch");if(left.ended){status.textContent="Launch time reached. Final checks are in progress — check back shortly.";timer.dataset.ended="true";if(interval!==null)clearInterval(interval);return false}return true}
if(render())interval=setInterval(render,250);document.addEventListener("visibilitychange",()=>{if(!document.hidden)render()});
})();