/* ---- город ---- */
bx(400,.1,400,0x6f8f66,0,-.05,0);
bx(14,.1,400,0x333338,0,.05,0);bx(400,.1,14,0x333338,0,.06,0);
bx(.3,.12,400,0xe8c800,0,.07,0);bx(400,.12,.3,0xe8c800,0,.08,0);
const B=[],FL=[5,5,5,6,8,9,10,12,13,14,15,16,17,18,19,20].sort(()=>Math.random()-.5);let k=0;
for(const gx of[-68,-34,34,68])for(const gz of[-68,-34,34,68]){
 const f=FL[k++],w=14+(Math.random()*6|0),d=14+(Math.random()*6|0),h=f*3,col=`hsl(${Math.random()*360|0},14%,${55+(Math.random()*20|0)}%)`;
 const mw=new THREE.MeshLambertMaterial({map:tx(col,w/6,f)}),md=new THREE.MeshLambertMaterial({map:tx(col,d/6,f)}),mr=new THREE.MeshLambertMaterial({color:0x4a4a50});
 const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),[md,md,mr,mr,mw,mw]);m.position.set(gx,h/2,gz);sc.add(m);
 bx(1.8,2.6,.2,0x3a2a1a,gx,1.3,gz+d/2);if(f>5)bx(.35,.45,.2,0xffcc00,gx+.6,1.3,gz+d/2+.15);
 B.push({id:k,x:gx,z:gz,w,d,h,f})}
const T=[];
for(let i=0;i<20;i++){const g=new THREE.Group();let p=(Math.random()-.5)*180;if(Math.abs(p)<9)p+=p<0?-12:12;const s=i%4<2?10:-10;
 bx(.4,2,.4,0x6b4a2a,0,1,0,g);const l=new THREE.Mesh(new THREE.ConeGeometry(1.6,4,7),new THREE.MeshLambertMaterial({color:0x2f7a3a}));l.position.y=4;g.add(l);
 g.position.set(i%2?s:p,0,i%2?p:s);sc.add(g);T.push(g)}
/* ---- машины и люди ---- */
const N=[];
function glb(n,h,g){if(!THREE.GLTFLoader)return;new THREE.GLTFLoader().load('models/'+n+'.glb',o=>{const m=o.scene,b=new THREE.Box3().setFromObject(m),s=h/(b.max.y-b.min.y);m.scale.setScalar(s);m.position.y=-b.min.y*s;g.clear();g.add(m)},undefined,()=>{})}
for(let i=0;i<14;i++){const car=i%7<3,g=new THREE.Group(),ax=i%2,dr=(i>>1)%2?1:-1;let l=null;
 if(car){bx(4,.8,1.8,Math.random()*0xffffff,0,.7,0,g);bx(2,.7,1.6,0x99aacc,0,1.4,0,g);for(const a of[-1.3,1.3])for(const b of[-.9,.9])bx(.7,.7,.3,0x111111,a,.35,b,g);glb('car',1.5,g);
  g.position.set(0,0,0);g.rotation.y=ax?-dr*Math.PI/2:(dr<0?Math.PI:0)}
 else{const c=Math.random()*0xffffff;l=[-.15,.15].map(x=>{const q=new THREE.Group();q.position.set(x,.8,0);bx(.22,.8,.26,0x222244,0,-.4,0,q);g.add(q);return q});
  bx(.5,.7,.3,c,0,1.15,0,g);bx(.15,.6,.2,c,-.35,1.15,0,g);bx(.15,.6,.2,c,.35,1.15,0,g);
  const h=new THREE.Mesh(new THREE.SphereGeometry(.2,8,6),new THREE.MeshLambertMaterial({color:0xe0b090}));h.position.y=1.7;g.add(h);glb('person',1.75,g);
  g.rotation.y=ax?(dr<0?Math.PI:0):dr*Math.PI/2}
 const line=car?dr*3.5:(i%4<2?9:-9),a=(Math.random()-.5)*190;g.position.set(ax?line:a,0,ax?a:line);
 sc.add(g);N.push({g,ax,dr,l,ph:Math.random()*6,sp:car?9+Math.random()*4:1.4})}
sc.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true}});
