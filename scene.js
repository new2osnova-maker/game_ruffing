/* ---- сцена ---- */
const cv=$('c'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true}),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(70,1,.1,400);
cam.rotation.order='YXZ';R.shadowMap.enabled=true;
sc.background=new THREE.Color(0xf0a878);sc.fog=new THREE.Fog(0xf0a878,40,170);
const sun=new THREE.DirectionalLight(0xffe2b8,.85);sun.position.set(60,100,40);
Object.assign(sun.shadow.camera,{left:-110,right:110,top:110,bottom:-110,far:300});sun.shadow.camera.updateProjectionMatrix();sun.shadow.mapSize.set(1024,1024);
sc.add(sun,new THREE.HemisphereLight(0xffd9b0,0x445566,.75));
function rs(){R.setSize(innerWidth,innerHeight);const z=R.getDrawingBufferSize(new THREE.Vector2());rt.setSize(z.x,z.y);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',rs);
const bx=(w,h,d,c,x,y,z,p=sc)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshLambertMaterial({color:c}));m.position.set(x,y,z);p.add(m);return m};
function tx(col,rx,ry){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle=col;x.fillRect(0,0,64,64);
for(let i=0;i<2;i++){x.fillStyle=Math.random()<.35?'#ffe08a':'#2b4660';x.fillRect(8+i*30,14,20,30)}
const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.magFilter=THREE.NearestFilter;return t}
