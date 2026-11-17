/* ---- игра ---- */
const P={x:0,y:1.7,z:22},OP={};
let mode='street',roofB=null,curB=null,edgeArm=1,busy=0,t=0,lt=0,ph=0,fv=0,fd=[0,0],tt=0,SL=0,dkn=false;
const setTip=s=>{const e=$('tip');if(e.textContent!=s)e.textContent=s};
/* двери, крыша, падение */
$('act').onclick=()=>{if(st=='play'&&mode=='roof')snap()};$('act2').onclick=()=>{if(st=='play'&&mode=='roof'){const b=roofB;enter(b,stL(b)-1.5,Math.PI)}};
function door(b){if(b.f>5&&!S.it.key&&!OP[b.id]){const tl=S.it.cut?['болторезом',2000]:S.it.pl?['плоскогубцами',3200]:0;
 if(!tl){if(t-tt>2.5){tt=t;toast('🔒 Замок! Нужен ключ, болторез или плоскогубцы (🛒)')}return}
 toast('Вскрываешь замок '+tl[0]+'…');busy=1;setTimeout(()=>{busy=0;OP[b.id]=1;if(mode=='street')enter(b,1)},tl[1]);return}
 enter(b,1)}
function snap(){const b=roofB,first=!S.done[b.id],l0=lvl(),c=Math.max(1,Math.round(b.f*2*(first?1:.3)*(S.it.bal?1.2:1)));
 S.coins+=c;S.xp+=Math.round(b.f*(first?3:1));S.done[b.id]=1;save();hud();flash();bp(990);
 toast('📸 +'+c+' 🪙'+(lvl()>l0?'  ⭐ Новый уровень '+lvl()+'!':''))}
function startFall(){const b=roofB,dx=P.x-b.x,dz=P.z-b.z;fd=Math.abs(dx)/(b.w/2)>Math.abs(dz)/(b.d/2)?[Math.sign(dx),0]:[0,Math.sign(dz)];mode='fall';fv=0;toast('😱 Ты падаешь!')}
function pushOut(){const b=roofB,dx=P.x-b.x,dz=P.z-b.z;if(Math.abs(dx)/(b.w/2)>Math.abs(dz)/(b.d/2))P.x=b.x+Math.sign(dx||1)*(b.w/2+.3);else P.z=b.z+Math.sign(dz||1)*(b.d/2+.3);startFall()}
function die(){const l=Math.ceil(S.coins/2);S.coins-=l;save();hud();mode='street';roofB=null;edgeArm=1;P.y=1.7;pit=0;toast('💀 Ты разбился! −'+l+' 🪙');flash(1)}
function oFail(){if(st!='osu')return;st='play';$('osu').hidden=1;pushOut()}
function osu(){st='osu';jid=cid=null;vx=vy=0;$('jb').style.display='none';const o=$('osu'),big=S.it.gl,n=6;o.hidden=0;o.innerHTML='';let i=0;
 const nx=()=>{if(st!='osu')return;if(i++>=n){o.hidden=1;st='play';return toast('😮‍💨 Удержался!')}
  const e=document.createElement('div'),tm=big?1900:1450;e.className='o';e.style.left=10+Math.random()*80+'%';e.style.top=18+Math.random()*64+'%';
  e.style.width=e.style.height=(big?84:64)+'px';e.style.setProperty('--t',tm+'ms');e.innerHTML='<b>'+i+'</b>';o.appendChild(e);
  const to=setTimeout(oFail,tm);e.onpointerdown=ev=>{ev.stopPropagation();clearTimeout(to);e.remove();bp(600+i*70);setTimeout(nx,250)}};
 toast('⚠ Ветер! Жми круги!');nx()}
function play(dt){
 let jx=vx,jy=vy;if(keys.KeyW)jy=-1;if(keys.KeyS)jy=1;if(keys.KeyA)jx=-1;if(keys.KeyD)jx=1;
 let wob=0,tip='';fear=0;
 if(mode=='fall'){fv-=22*dt;P.y+=fv*dt;P.x+=fd[0]*2*dt;P.z+=fd[1]*2*dt;pit=Math.max(-1.3,pit-dt*1.5);fear=1;
  if(P.y<=1.7){P.y=1.7;die()}cam.position.set(P.x,P.y,P.z);cam.rotation.set(pit,yaw,Math.sin(t*9)*.05);return}
 mv=Math.min(1,Math.hypot(jx,jy));
 const sp=(mode=='street'?5:mode=='stair'?4:2.8)*dt,fw=-jy,rt=jx;
 P.x+=(-Math.sin(yaw)*fw+Math.cos(yaw)*rt)*sp;P.z+=(-Math.cos(yaw)*fw-Math.sin(yaw)*rt)*sp;
 let ty=1.7;
 if(mode=='street'){P.x=clamp(P.x,-95,95);P.z=clamp(P.z,-95,95);
  for(const b of B){const dx=P.x-b.x,dz=P.z-b.z,ox=b.w/2+.6-Math.abs(dx),oz=b.d/2+.6-Math.abs(dz);if(ox>0&&oz>0){if(ox<oz)P.x+=ox*Math.sign(dx);else P.z+=oz*Math.sign(dz)}
   const dd=Math.hypot(P.x-b.x,P.z-(b.z+b.d/2));if(dd<8)tip='🚪 Подъезд · '+b.f+' эт.'+(b.f>5&&!OP[b.id]&&!S.it.key?' 🔒':'');if(dd<1.7&&!busy)door(b)}}
 else if(mode=='stair'){P.x=clamp(P.x,998.75,1001.25);P.z=clamp(P.z,-SL,-.1);const p=-P.z,b=curB;ty=fy(p)+1.7;tip='Этаж '+(Math.floor(fy(p)/3)+1)+' из '+b.f+((p-6)%PER>=RUN&&p>6?' · 🚪 двери квартир заперты':'');
  if(p<.3){mode='street';curB=null;P.x=b.x;P.z=b.z+b.d/2+2;P.y=1.7;yaw=Math.PI}
  else if(p>SL-.5){mode='roof';roofB=b;curB=null;P.x=b.x;P.z=b.z;edgeArm=0;toast('Ты на крыше! Жми 📸. Не подходи к краю…')}}
 else{const b=roofB,edge=Math.min(b.w/2-Math.abs(P.x-b.x),b.d/2-Math.abs(P.z-b.z));ty=b.h+1.7;
  if(edge<0){startFall()}
  else{fear=Math.max(0,(2.5-edge)/2.5)*.6;if(edge<1.8){wob=Math.sin(t*4)*.03*(1.8-edge);if(edgeArm){edgeArm=0;if(Math.random()<.5)osu()}}else if(edge>3)edgeArm=1}}
 $('act').hidden=$('act2').hidden=mode!='roof';setTip(tip);
 P.y+=(ty-P.y)*Math.min(1,dt*6);cam.position.set(P.x,P.y,P.z);cam.rotation.set(pit,yaw,wob)}
function loop(ms){requestAnimationFrame(loop);const dt=Math.min((ms-lt)/1000,.05)||0;lt=ms;t+=dt;
 if(st=='menu'){fear=0;mv=0;const a=t*.1;cam.position.set(Math.sin(a)*90,45,Math.cos(a)*90);cam.lookAt(0,10,0)}else if(st=='play')play(dt);else mv=0;
 const dk=mode=='stair'&&st!='menu';if(dk!=dkn){dkn=dk;setDark(dk)}
 sky.position.copy(cam.position);ph+=dt*8*mv;
 BD.visible=AR[0].visible=AR[1].visible=st!='menu';BD.position.set(P.x,P.y-1.7,P.z);BD.rotation.y=yaw;
 lg.forEach((l,i)=>l.rotation.x=Math.sin(ph+i*Math.PI)*.6*mv);
 AR.forEach((g,i)=>{g.rotation.x=-.25+Math.sin(ph+i*Math.PI)*.12*mv;g.userData.h.material.color.setHex(S.it.gl?0x222222:0xe0b090)});
 if(S.g>2)T.forEach((g,i)=>g.rotation.z=Math.sin(t*1.5+i)*.05);
 N.forEach(n=>{if(!n.g.visible)return;const q=n.ax?'z':'x';n.g.position[q]+=n.dr*n.sp*dt;if(Math.abs(n.g.position[q])>100)n.g.position[q]*=-1;
  if(n.l){n.l[0].rotation.x=Math.sin(t*6+n.ph)*.6;n.l[1].rotation.x=-n.l[0].rotation.x}});
 if(post){pm.uniforms.f.value=fear;pm.uniforms.t.value=t;R.setRenderTarget(rt);R.render(sc,cam);R.setRenderTarget(null);R.render(qs,qc)}else R.render(sc,cam)}
ap();hud();requestAnimationFrame(loop);
