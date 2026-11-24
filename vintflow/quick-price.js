function calc(cost,fees,profit,market){
 const values=[cost,fees,profit,market];
 if(!values.every(x=>typeof x==="number"&&Number.isFinite(x)&&x>=0&&x<=100000&&Math.abs(x*100-Math.round(x*100))<1e-6)||market<.01)return null;
 const [a,b,c,d]=values.map(x=>Math.round(x*100));
 return {minimum:(a+b+c)/100,quick:Math.max(1,Math.round(d*.85))/100,market:d/100,high:Math.round(d*1.15)/100};
}
(()=>{
 const by=id=>document.getElementById(id),ids=["qc-cost","qc-fees","qc-profit","qc-market"],fields=ids.map(by),button=by("qc-button"),output=by("qc-result");
 if(fields.some(f=>!f)||!button||!output)return;
 const fmt=n=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(n);
 function update(){
  const values=fields.map(f=>f.value.trim()===""?NaN:Number(f.value)),r=calc(...values);
  fields.forEach((f,i)=>f.setAttribute("aria-invalid",String(!Number.isFinite(values[i])||values[i]<(i===3?.01:0)||values[i]>100000||Math.abs(values[i]*100-Math.round(values[i]*100))>=1e-6)));
  output.textContent=!r?"Enter valid non-negative amounts (up to two decimal places), and a comparison price of at least £0.01.":"Target floor: "+fmt(r.minimum)+" · Quick sale scenario: "+fmt(r.quick)+" · Comparison ask: "+fmt(r.market)+" · Higher ask scenario: "+fmt(r.high)+". "+(r.quick<r.minimum?"The quick-sale scenario is below your profit target. Review before accepting.":"The quick-sale scenario meets your stated target before any unrecorded costs.");
 }
 button.addEventListener("click",update);fields.forEach(f=>f.addEventListener("input",update));update();
})();
