/* Entry sequence inspired by Codrops BlockRevealers and PageRevealEffects.
   Original implementation for Li Zhenwen; no runtime dependencies. */
(() => {
 'use strict';
 const root=document.documentElement;
 const intro=document.getElementById('entry-intro');
 const skip=document.getElementById('entry-skip');
 const replay=document.getElementById('entry-replay');
 const word=document.getElementById('entry-word');
 const context=document.getElementById('entry-context');
 const chapter=document.getElementById('entry-chapter');
 const seconds=document.getElementById('entry-seconds');
 const background=[...document.querySelectorAll('.skip-link,.site-header,#main,.site-footer')];
 const phases=[
  ['品牌构建','法国嘉兰 · 年收入从 0 到 1,000 万元','01'],
  ['全国运营','回收宝 · 全国 600 余家门店','02'],
  ['渠道协同','联合利华 · 约 350 家线下终端','03'],
  ['逆势增长','苏宁电器 · 区域首年营收增长 10%','04'],
  ['李振文','品牌与运营 · 把增长做出来','05']
 ];
 const AUTO_MS=3900;
 let state='idle',timers=[],frame=0,animations=[],started=0,wasInert=[];
 clearTimeout(window.__entrySafety);
 function reduced(){try{return matchMedia('(prefers-reduced-motion: reduce)').matches||localStorage.getItem('zw-motion')==='off';}catch{return matchMedia('(prefers-reduced-motion: reduce)').matches;}}
 function cleanup(){timers.forEach(clearTimeout);timers=[];cancelAnimationFrame(frame);animations.forEach(a=>a.cancel());animations=[];}
 function showPhase(index){
  const p=phases[index];
  word.textContent=p[0];context.textContent=p[1];chapter.textContent=p[2]+' / 05';
  intro.dataset.chapter=String(index+1);
  if(!reduced()){
   animations.forEach(a=>a.cancel());
   animations=[word.animate([{transform:'translateY(110%)',opacity:.1,filter:'blur(5px)'},{transform:'translateY(0)',opacity:1,filter:'blur(0)'}],{duration:480,easing:'cubic-bezier(.22,1,.36,1)'}),context.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:440,easing:'cubic-bezier(.22,1,.36,1)'})];
  }
 }
 function dismiss(reason){
  if(state!=='playing')return;
  state='leaving';cleanup();
  root.dataset.introState='leaving';root.dataset.introExitReason=reason;
  root.dataset.introWaitMs=String(Math.round(performance.now()-started));
  root.classList.add('intro-leaving');root.classList.remove('intro-active');
  intro.classList.add('is-leaving');intro.classList.toggle('is-fast',reason!=='automatic');
  background.forEach((el,i)=>el.inert=wasInert[i]);
  intro.inert=true;
  window.dispatchEvent(new CustomEvent('workspace:enter'));
  const finish=()=>{
   state='done';intro.hidden=true;intro.inert=false;
   root.classList.remove('intro-leaving');root.dataset.introState='done';
   root.dataset.introElapsedMs=String(Math.round(performance.now()-started));
  };
  timers.push(setTimeout(finish,reduced()?140:(reason==='automatic'?720:420)));
 }
 function start(){
  if(state==='playing'||state==='leaving')return;
  cleanup();state='playing';started=performance.now();
  root.dataset.introState='playing';root.dataset.introExitReason='';
  delete root.dataset.introWaitMs;delete root.dataset.introElapsedMs;
  intro.hidden=false;intro.inert=false;intro.classList.remove('is-leaving','is-fast');
  root.classList.remove('intro-leaving');root.classList.add('intro-active');
  wasInert=background.map(el=>el.inert);background.forEach(el=>el.inert=true);
  root.classList.toggle('intro-reduced',reduced());
  intro.style.setProperty('--entry-progress','0');
  // Timer is independent of animation events, fonts and image downloads.
  timers.push(setTimeout(()=>dismiss('automatic'),AUTO_MS));
  showPhase(reduced()?4:0);
  if(!reduced())[850,1700,2550,3250].forEach((delay,i)=>timers.push(setTimeout(()=>{if(state==='playing')showPhase(i+1);},delay)));
  const tick=now=>{
   if(state!=='playing')return;
   const elapsed=now-started;
   intro.style.setProperty('--entry-progress',String(Math.min(elapsed/AUTO_MS,1)));
   seconds.textContent=String(Math.max(1,Math.ceil((AUTO_MS-elapsed)/1000)));
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);skip.focus({preventScroll:true});
 }
 intro.addEventListener('click',()=>dismiss('click'));
 intro.addEventListener('keydown',event=>{
  if(state!=='playing')return;
  if(['Enter',' ','Escape'].includes(event.key)){event.preventDefault();dismiss('keyboard');}
  else if(event.key==='Tab'){event.preventDefault();skip.focus({preventScroll:true});}
 });
 replay.addEventListener('click',start);
 // If the tab was suspended during the sequence, finish as soon as it returns.
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&state==='playing'&&performance.now()-started>=AUTO_MS)dismiss('automatic');});
 start();
})();
