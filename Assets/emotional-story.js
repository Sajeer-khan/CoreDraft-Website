/* CoreDraft emotional story. Progressively enhanced; readable without animation. */
(function(){
 "use strict";
 const doc=document,scene=doc.querySelector(".feel-story");
 if(!scene)return;
 const visual=scene.querySelector(".feel-visual"),steps=Array.from(scene.querySelectorAll(".feel-stage"));
 if(!visual||!steps.length)return;
 const reduced=matchMedia("(prefers-reduced-motion: reduce)");
 let phase=1,hasBeenSeen=false,raf=0;
 function setPhase(i){
  if(i<1||i>steps.length)return;
  phase=i;visual.dataset.phase=String(i);
  steps.forEach((s,n)=>{s.classList.toggle("is-current",n===i-1)});
  const label=visual.querySelector(".phase-label");
  if(label)label.textContent=["The chasing","The clarity","The headspace"][i-1];
 }
 function checkPosition(){
   raf=0;const target=innerHeight*.49;
   let index=0,minDist=Number.POSITIVE_INFINITY;
   steps.forEach((s,i)=>{const r=s.getBoundingClientRect(),center=r.top+Math.min(r.height/2,innerHeight*.28);const dist=Math.abs(center-target);if(dist<minDist){minDist=dist;index=i}});
   setPhase(index+1);
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(checkPosition)}
 addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule,{passive:true});
 if(reduced.addEventListener)reduced.addEventListener("change",schedule);
 if("IntersectionObserver" in window){
  const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){hasBeenSeen=true;schedule()}})},{rootMargin:"10% 0px 10% 0px",threshold:0});
  steps.forEach(x=>io.observe(x));
 }
 setPhase(1);schedule();
})();
