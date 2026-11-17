/* подъезд: холл, пролёты по этажам, площадки с дверями квартир */
const RUN=4.5,LAND=2,PER=RUN+LAND,SLP=3/RUN,TH=Math.atan(SLP);
const stL=b=>6+(b.f-1)*PER+RUN;
const fy=p=>{if(p<6)return 0;const q=p-6,n=Math.floor(q/PER),r=q-n*PER;return n*3+(r<RUN?r*SLP:3)};
const SW=new THREE.Group();SW.position.x=1000;sc.add(SW);
const stx=(()=>{const c=document.createElement('canvas');c.width=8;c.height=64;const x=c.getContext('2d');x.fillStyle='#8a8f98';x.fillRect(0,0,8,64);x.fillStyle='#4a4f58';x.fillRect(0,0,8,12);
 const q=new THREE.CanvasTexture(c);q.wrapS=q.wrapT=THREE.RepeatWrapping;q.magFilter=THREE.NearestFilter;return q})();
function mkStair(b){SW.clear();const rl=Math.hypot(RUN,3),c=Math.cos(TH),s=Math.sin(TH);
 const m=new THREE.MeshLambertMaterial({map:stx.clone()});m.map.needsUpdate=true;m.map.repeat.set(1,RUN/.3);
 bx(3,.2,6,0x70757e,0,-.1,-3,SW);bx(3.4,.2,6,0x9a9a9a,0,3,-3,SW);
 for(const x of[-1.6,1.6])bx(.2,3,6,0xb8b0a0,x,1.5,-3,SW);
 bx(.1,1,1.6,0x4466aa,-1.45,1.3,-3,SW);bx(2,2.4,.2,0x3a2a1a,0,1.2,.1,SW);
 for(let i=0;i<b.f;i++){const p0=6+i*PER,y0=i*3,zc=-(p0+RUN/2);
  const r=new THREE.Mesh(new THREE.BoxGeometry(3,.2,rl),m);r.position.set(0,y0+1.4,zc);r.rotation.x=TH;SW.add(r);
  for(const x of[-1.6,1.6])bx(.2,4,rl,0xb8b0a0,x,y0+1.5+1.7*c,zc+1.7*s,SW).rotation.x=TH;
  if(i<b.f-1){const pl=-(p0+RUN+LAND/2);bx(3,.2,LAND,0x70757e,0,y0+2.9,pl,SW);
   for(const x of[-1.6,1.6])bx(.2,3,LAND,0xb8b0a0,x,y0+4.5,pl,SW);
   bx(.1,2.2,1.1,i%2?0x7a4a2a:0x2a5a7a,1.52,y0+4.1,pl,SW);bx(.8,.1,.8,0xfff2b0,0,y0+5.6,pl,SW)}}
 bx(2,2.4,.2,0x5aa0ff,0,b.h+1.2,-stL(b)-.1,SW)}
function enter(b,p,yw){curB=b;roofB=null;mkStair(b);SL=stL(b);mode='stair';P.x=1000;P.z=-p;P.y=fy(p)+1.7;yaw=yw||0;pit=0}
function setDark(on){sky.visible=!on;const c=on?0x15171c:0xf0a878;sc.background=new THREE.Color(c);sc.fog.color.set(c);if(on){sc.fog.near=2;sc.fog.far=28}else ap()}
