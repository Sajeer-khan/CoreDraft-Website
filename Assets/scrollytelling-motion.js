/* CoreDraft cinematic scroll orchestrator. Native fallback, GSAP progressive enhancement. */
(function(){
  'use strict';
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  var small=window.matchMedia('(max-width:840px)');
  var chapters=Array.from(document.querySelectorAll('.story-chapter'));
  var scenes=Array.from(document.querySelectorAll('.story-scene'));
  var productSection=document.querySelector('#products');
  if(!productSection||!chapters.length)return;
  var products=[
    {id:'quotedesk',images:['quotedesk-editor.webp','quotedesk-workflow.webp','quotedesk-review.webp'],tags:['Quotation builder','Approval record','Controlled review']},
    {id:'procureflow',images:['procureflow-overview.webp','procureflow-requisitions.webp','procureflow-pipeline.webp'],tags:['Procurement overview','Requisition activity','Purchasing pipeline']},
    {id:'pharmadocs',images:['pharmadocs-overview.webp','pharmadocs-authoring.webp','pharmadocs-governance.webp'],tags:['Quality overview','Document workspace','Quality governance']},
    {id:'peopledesk',images:[],tags:['Payroll setup','Salary controls','Governance register']},
    {id:'construction',images:[],tags:['Project expense control','Billing overview','Evidence workflow']}
  ];
  var $=function(sel,root){return(root||document).querySelector(sel)};
  var $$=function(sel,root){return Array.from((root||document).querySelectorAll(sel))};
  function isMotionAllowed(){return !reduced.matches;}
  // Decorative geometry; pointer-events none for full keyboard/touch compatibility.
  var hero=$('.hero-saas');
  if(hero){
    var ambient=document.createElement('div');ambient.className='hero-ambient';ambient.setAttribute('aria-hidden','true');
    ambient.innerHTML='<span class="orb"></span><span class="orb"></span><span class="orb"></span>';
    hero.insertBefore(ambient,hero.firstChild);
  }
  var halo=document.createElement('div');halo.className='story-ambient';halo.setAttribute('aria-hidden','true');
  halo.innerHTML='<span></span>'.repeat(7);productSection.insertBefore(halo,productSection.firstChild);
  var marquee=document.createElement('div');marquee.className='cd-motion-marquee';marquee.setAttribute('aria-hidden','true');
  var words='<span>Built for real operations</span><i>✳</i><span>Less administration</span><i>✳</i><span>More visibility</span><i>✳</i><span>Custom-fit business systems</span><i>✳</i>';
  marquee.innerHTML='<div>'+words+words+words+words+'</div>';
  productSection.parentNode.insertBefore(marquee,productSection);
  var rail=document.createElement('nav');rail.className='cd-story-rail';rail.setAttribute('aria-label','Product chapter navigation');
  rail.innerHTML=products.map(function(p,i){return '<a href="#story-'+p.id+'" aria-label="Jump to '+p.id+'" title="'+p.id+'"></a>'}).join('');
  document.body.appendChild(rail);
  var pulse=document.createElement('div');pulse.className='cd-story-pulse';pulse.setAttribute('aria-hidden','true');pulse.innerHTML='<span></span>';document.body.appendChild(pulse);
  var pulseLine=$('span',pulse);
  chapters.forEach(function(chapter,index){
    chapter.dataset.ghost=String(index+1).padStart(2,'0');
    var p=products[index];
    var list=$$('.story-scene',chapter);
    list.forEach(function(scene,ix){
      var media=$('.story-media',scene);if(!media)return;
      // Optional true screenshot replacement. Offline/demo captures from the approved screenshot pack.
      if(p.images[ix] && $('.story-concept',media)){
        var frame=document.createElement('div');frame.className='story-verified-frame';
        var image=document.createElement('img');
        image.alt=p.tags[ix]+' — screenshot from a sample-data product interface';
        image.loading='lazy';image.decoding='async';
        frame.dataset.crop=ix===1?'requests':ix===2?'pipeline':'overview';
        frame.appendChild(image);
        var tag=document.createElement('span');tag.className='story-frame-tag';tag.textContent='ACTUAL INTERFACE · SAMPLE DATA';frame.appendChild(tag);
        image.addEventListener('load',function(){frame.classList.add('loaded');scene.classList.add('has-screenshot')},{once:true});
        image.addEventListener('error',function(){frame.remove()},{once:true});
        media.appendChild(frame);
        image.src='Assets/product-screens/'+p.images[ix];
      }
      if(isMotionAllowed()){
        var detail=document.createElement('div');detail.className='story-float-details';detail.setAttribute('aria-hidden','true');
        detail.innerHTML='<span>'+p.tags[ix]+'</span><span>0'+(ix+1)+' / 03</span>';
        media.appendChild(detail);
      }
    });
  });
  var styles=getComputedStyle(document.documentElement);
  var onViewport=function(){
    var r=productSection.getBoundingClientRect();
    var active=r.bottom>innerHeight*.2&&r.top<innerHeight*.85;
    rail.classList.toggle('is-visible',active);
    var ratio=Math.max(0,Math.min(1,(-r.top)/(Math.max(1,productSection.offsetHeight-innerHeight))));
    pulseLine.style.width=(ratio*100).toFixed(2)+'%';
    var current=0,vertical=innerHeight*.43;
    chapters.forEach(function(ch,i){if(ch.getBoundingClientRect().top<=vertical)current=i});
    $$('.cd-story-rail a',rail).forEach(function(a,i){a.classList.toggle('active',i===current);if(i===current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  };
  var nativeEnabled=!window.gsap||!window.ScrollTrigger;
  var state={raf:0,mouseX:50,mouseY:50};
  function renderNative(){
    state.raf=0;onViewport();
    if(!nativeEnabled||!isMotionAllowed())return;
    var range=Math.max(1,innerHeight);
    if(hero&&!small.matches){
      var h=hero.getBoundingClientRect();
      var hprogress=Math.min(1,Math.max(0,-h.top/Math.max(h.height,1)));
      var mock=$('.dashboard-wrap',hero);
      if(mock)mock.style.transform='translate3d(0,'+(hprogress*75).toFixed(1)+'px,0) rotate('+(-hprogress*3).toFixed(2)+'deg)';
    }
    if(small.matches)return;
    scenes.forEach(function(scene){
      var r=scene.getBoundingClientRect();
      if(r.top>range*1.35||r.bottom<-range*.3)return;
      var p=Math.max(0,Math.min(1,(range-r.top)/(range+r.height)));
      var media=$('.story-media',scene),caption=$('.story-scene-caption',scene);
      if(media){
        var depth=Math.sin(Math.PI*p),x=(p-.5)*-24;
        media.style.transform='perspective(1400px) translate3d('+x.toFixed(2)+'px,'+((.5-p)*70).toFixed(1)+'px,0) rotateY('+((.5-p)*11).toFixed(2)+'deg) rotateX('+((p-.5)*2).toFixed(2)+'deg) scale('+(0.94+0.06*depth).toFixed(4)+')';
      }
      if(caption)caption.style.transform='translateY('+((.5-p)*15).toFixed(1)+'px)';
    });
    if(halo){
      var r=productSection.getBoundingClientRect();var sectionProgress=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));
      $$('.story-ambient span',halo).forEach(function(o,i){o.style.transform='translate3d('+Math.sin(sectionProgress*7+i)*18+'px,'+((i%2===0?1:-1)*sectionProgress*(50+i*18)).toFixed(1)+'px,0) rotate('+(sectionProgress*130)+'deg)'});
    }
  }
  function schedule(){if(state.raf)return;state.raf=requestAnimationFrame(renderNative)}
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  reduced.addEventListener&&reduced.addEventListener('change',schedule);
  small.addEventListener&&small.addEventListener('change',schedule);
  document.addEventListener('pointermove',function(e){
    if(!isMotionAllowed()||small.matches)return;
    state.mouseX=(e.clientX/innerWidth*100).toFixed(1);
    state.mouseY=(e.clientY/innerHeight*100).toFixed(1);
    if(productSection.getBoundingClientRect().bottom>0)productSection.style.setProperty('--glow-x',state.mouseX+'%');
  },{passive:true});
  if('IntersectionObserver' in window){
    var lit=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-spotlight');lit.unobserve(entry.target)}})},{threshold:.48});
    scenes.forEach(function(s){lit.observe(s)});
  }
  // GSAP adds scrubbing, pin-like continuity, reveal sequencing and smooth cross-chapter depth.
  // If the animation CDN is unavailable, the native requestAnimationFrame engine above remains fully usable.
  function enableGsap(){
    if(!window.gsap||!window.ScrollTrigger||!isMotionAllowed())return;
    nativeEnabled=false;
    var gsap=window.gsap,ST=window.ScrollTrigger;
    gsap.registerPlugin(ST);
    if(hero){
      var title=$('#hero-heading'),intro=$('.hero-intro',hero),buttons=$('.hero-saas .button-light');
      gsap.fromTo(title,{y:90,opacity:0,filter:'blur(12px)'},{y:0,opacity:1,filter:'blur(0px)',duration:1.35,ease:'power4.out',delay:.05,clearProps:'filter'});
      if(intro)gsap.fromTo(intro,{y:45,opacity:0},{y:0,opacity:1,duration:1.15,delay:.25,ease:'power3.out'});
      gsap.fromTo('.hero-points span',{y:25,opacity:0},{y:0,opacity:1,stagger:.11,duration:.7,delay:.65,ease:'power2.out'});
      var preview=$('.dashboard-wrap',hero);
      if(preview){
        gsap.fromTo(preview,{x:80,y:80,rotateY:15,opacity:0,scale:.86},{x:0,y:0,rotateY:0,opacity:1,scale:1,duration:1.4,ease:'power3.out',delay:.18});
        if(!small.matches)gsap.to(preview,{y:130,rotate:-5,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1.3}});
      }
      gsap.to('.hero-ambient .orb',{y:-120,rotate:80,ease:'none',stagger:{each:.05},scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1}});
    }
    gsap.fromTo('.story-preface h2',{y:65,opacity:0,filter:'blur(8px)'},{y:0,opacity:1,filter:'blur(0px)',duration:1.15,ease:'power3.out',clearProps:'filter',scrollTrigger:{trigger:'.story-preface',start:'top 80%'}});
    chapters.forEach(function(chapter,i){
      var head=$('.story-chapter-text h3',chapter);
      var content=$('.story-chapter-text',chapter);
      if(head){
        gsap.fromTo(head,{y:42,opacity:0,clipPath:'inset(0 0 100% 0)'},{y:0,opacity:1,clipPath:'inset(0 0 0% 0)',duration:1,ease:'power3.out',scrollTrigger:{trigger:chapter,start:'top 70%'}});
      }
      if(content&&!small.matches){
        gsap.to(content,{y:-20,ease:'none',scrollTrigger:{trigger:chapter,start:'top 16%',end:'bottom 93%',scrub:2}});
      }
      $$('.story-scene',chapter).forEach(function(scene,j){
        var media=$('.story-media',scene),caption=$('.story-scene-caption',scene),detail=$('.story-float-details',scene);
        if(!media)return;
        if(!small.matches){
          var fromX=(i%2===0?75:-75),fromRotate=(i%2===0?9:-9);
          gsap.fromTo(media,{x:fromX,y:105,opacity:.55,rotateY:fromRotate,rotateX:8,scale:.86,filter:'blur(4px)'},{
            x:0,y:-25,opacity:1,rotateY:-fromRotate*.18,rotateX:0,scale:1,filter:'blur(0px)',ease:'none',
            scrollTrigger:{trigger:scene,start:'top 97%',end:'top 20%',scrub:1.15},
          });
          gsap.to(media,{y:-87,rotateY:fromRotate*.2,scale:.94,ease:'none',scrollTrigger:{trigger:scene,start:'top 20%',end:'bottom 10%',scrub:1.4}});
          if(detail)gsap.fromTo($$('span',detail),{x:function(index){return index===0?110:-100},y:35,opacity:0,rotate:0},{x:0,y:0,opacity:1,rotate:function(index){return index===0?5:-5},stagger:.1,ease:'none',scrollTrigger:{trigger:scene,start:'top 75%',end:'top 20%',scrub:1}});
        }else{
          gsap.fromTo(media,{opacity:.6,y:40,scale:.97},{opacity:1,y:0,scale:1,duration:.7,ease:'power2.out',scrollTrigger:{trigger:scene,start:'top 87%',once:true}});
        }
        if(caption)gsap.fromTo(caption,{y:45,opacity:0},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:scene,start:'top 70%',end:'top 35%',scrub:small.matches?false:1}});
      });
    });
    gsap.fromTo('.story-outro h3',{scale:.91,opacity:.65,y:55},{scale:1,opacity:1,y:0,ease:'power2.out',duration:1,scrollTrigger:{trigger:'.story-outro',start:'top 77%'}});
    ST.refresh();
    schedule();
  }
  if(document.readyState==='complete')enableGsap();
  else window.addEventListener('load',enableGsap,{once:true});
  schedule();
})();
