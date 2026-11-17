/* ---- управление ---- */
let yaw=0,pit=0,vx=0,vy=0,jid=null,cid=null,j0,cl;const keys={};
document.addEventListener('pointerdown',e=>{if(st!='play'||e.target.closest('button'))return;
 const w=S.zone*innerWidth,jz=S.left?e.clientX>innerWidth-w:e.clientX<w;
 if(jz&&jid==null){jid=e.pointerId;j0=[e.clientX,e.clientY];const s=130*S.js;Object.assign($('jb').style,{display:'block',width:s+'px',height:s+'px',left:e.clientX-s/2+'px',top:e.clientY-s/2+'px'});$('jb').children[0].style.transform=''}
 else if(!jz&&cid==null){cid=e.pointerId;cl=[e.clientX,e.clientY]}});
document.addEventListener('pointermove',e=>{
 if(e.pointerId==jid){const r=65*S.js;let dx=e.clientX-j0[0],dy=e.clientY-j0[1];const m=Math.hypot(dx,dy);if(m>r){dx*=r/m;dy*=r/m}vx=dx/r;vy=dy/r;$('jb').children[0].style.transform='translate('+dx+'px,'+dy+'px)'}
 else if(e.pointerId==cid){const q=(.002+S.sens*.007)*(S.inv?-1:1);yaw-=(e.clientX-cl[0])*q;pit=clamp(pit-(e.clientY-cl[1])*q,-1.3,1.3);cl=[e.clientX,e.clientY]}});
const pu=e=>{if(e.pointerId==jid){jid=null;vx=vy=0;$('jb').style.display='none'}if(e.pointerId==cid)cid=null};
document.addEventListener('pointerup',pu);document.addEventListener('pointercancel',pu);
