/* Product-detail UX: responsive cinematic motion, no dependency on private application APIs. */
(function(){
 'use strict';
 const doc=document,reduce=matchMedia('(prefers-reduced-motion:reduce)'),narrow=matchMedia('(max-width:850px)');
 const nav=doc.querySelector('.nav-items'),toggle=doc.querySelector('.menu-toggle');
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
 doc.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
 }
 const pulse=doc.querySelector('.page-pulse b'),hero=doc.querySelector('.hero'),browser=doc.querySelector('.hero .browser');
 let raf=0;
 function update(){
   raf=0;
   const height=Math.max(1,doc.documentElement.scrollHeight-innerHeight),p=Math.min(1,Math.max(0,scrollY/height));
   if(pulse)pulse.style.width=(p*100).toFixed(2)+'%';
   if(reduce.matches||narrow.matches)return;
   const h=hero?.getBoundingClientRect();
   if(browser&&h&&h.bottom>0){
     const hp=Math.min(1,Math.max(0,-h.top/Math.max(h.height,1)));
     browser.style.transform='translate3d(0,'+(hp*60).toFixed(1)+'px,0) rotateY('+(-7+hp*3).toFixed(1)+'deg) rotateX('+(3-hp*2).toFixed(1)+'deg) rotate(-1.5deg)';
   }
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(update)}
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 reduce.addEventListener?.('change',schedule);
 if('IntersectionObserver'in window&&!reduce.matches){
    doc.documentElement.classList.add('motion-on');
    const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('enter');io.unobserve(x.target)}}),{threshold:0.08,rootMargin:'0px 0px 90px 0px'});
    doc.querySelectorAll('.reveal').forEach((node,i)=>{if(i%3===1)node.classList.add('staggered');io.observe(node)});
 }
 function withGsap(){
   if(!window.gsap||!window.ScrollTrigger||reduce.matches)return;
   const gsap=window.gsap, ST=window.ScrollTrigger;gsap.registerPlugin(ST);
   if(hero){
      const main=hero.querySelector('h1'),title=hero.querySelector('h2'),para=hero.querySelector('.hero-intro'),visual=hero.querySelector('.hero-preview');
      if(main)gsap.fromTo(main,{y:70,opacity:0,filter:'blur(10px)'},{y:0,opacity:1,filter:'blur(0px)',duration:1.15,ease:'power3.out',clearProps:'filter'});
      if(title)gsap.fromTo(title,{y:33,opacity:0},{y:0,opacity:1,duration:.85,ease:'power3.out',delay:.16});
      if(para)gsap.fromTo(para,{y:26,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',delay:.24});
      if(visual){gsap.fromTo(visual,{x:75,y:90,opacity:0,rotateY:12,scale:.9},{x:0,y:0,opacity:1,rotateY:0,scale:1,duration:1.25,ease:'power3.out',delay:.1});
       if(!narrow.matches)gsap.to(visual,{y:90,scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1.3},ease:'none'});}
      gsap.to('.hero-glow',{y:-90,rotate:35,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1.2}});
   }
   if(!narrow.matches){
     doc.querySelectorAll('.gallery-step').forEach((item,i)=>{
      const pic=item.querySelector('.shot'),heading=item.querySelector('.shot-copy h3');
      if(pic){gsap.fromTo(pic,{y:95,x:i%2?55:-55,rotateY:i%2?-7:7,scale:.92,opacity:.65},{y:-26,x:0,rotateY:0,scale:1,opacity:1,ease:'none',scrollTrigger:{trigger:item,start:'top 96%',end:'top 27%',scrub:1.35}});
        gsap.to(pic,{y:-75,scale:.95,rotateY:i%2?2:-2,ease:'none',scrollTrigger:{trigger:item,start:'top 25%',end:'bottom 10%',scrub:1.2}});}
      if(heading)gsap.fromTo(heading,{y:42,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:item,start:'top 75%',once:true}});
     });
   }
   ST.refresh();
 }
 if(doc.readyState==='complete')withGsap();else addEventListener('load',withGsap,{once:true});
 update();
})();