/* ---- шейдеры, тело ---- */
let post=0,fear=0,mv=0;sc.add(cam);
const sky=new THREE.Mesh(new THREE.SphereGeometry(300,16,8),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,
 vertexShader:'varying vec3 p;void main(){p=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'varying vec3 p;void main(){float h=clamp(p.y,0.,1.);vec3 c=mix(vec3(.96,.66,.47),vec3(.12,.2,.45),pow(h,.6));float s=pow(max(dot(p,normalize(vec3(.5,.3,.3))),0.),40.);gl_FragColor=vec4(c+vec3(1.,.7,.4)*s,1.);}'}));
sky.renderOrder=-1;sc.add(sky);
const rt=new THREE.WebGLRenderTarget(4,4),qs=new THREE.Scene(),qc=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
const pm=new THREE.ShaderMaterial({depthTest:false,uniforms:{tD:{value:rt.texture},f:{value:0},t:{value:0}},
 vertexShader:'varying vec2 u;void main(){u=uv;gl_Position=vec4(position.xy,0.,1.);}',
 fragmentShader:'uniform sampler2D tD;uniform float f,t;varying vec2 u;void main(){vec2 c=u-.5;float d=dot(c,c);vec2 w=vec2(sin(u.y*40.+t*6.),cos(u.x*40.+t*5.))*.003*f;vec2 o=c*(.01+f*.05);vec3 k=vec3(texture2D(tD,u+w+o).r,texture2D(tD,u+w).g,texture2D(tD,u+w-o).b);k=mix(k,vec3(dot(k,vec3(.3,.59,.11))),f*.6);k*=vec3(1.06,1.,.92);k*=1.-d*(1.1+f*1.5);gl_FragColor=vec4(k,1.);}'});
qs.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),pm));
const BD=new THREE.Group(),lg=[-.12,.12].map(x=>{const q=new THREE.Group();q.position.set(x,.9,-.12);bx(.2,.9,.24,0x2a3350,0,-.45,0,q);bx(.22,.14,.34,0x111111,0,-.85,-.06,q);BD.add(q);return q});sc.add(BD);
const AR=[-1,1].map(s=>{const g=new THREE.Group();g.position.set(s*.3,-.34,-.4);bx(.12,.12,.55,0x3a4a7a,0,0,.12,g);g.userData.h=bx(.13,.13,.14,0xe0b090,0,0,-.2,g);cam.add(g);return g});
