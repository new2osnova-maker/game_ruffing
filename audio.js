/* ---- звук (музыка и фон создаются кодом) ---- */
let AC,mg,ag;
const av=()=>{if(AC){mg.gain.value=S.vol;ag.gain.value=S.amb}};
function bp(f){if(!AC)return;const o=AC.createOscillator(),e=AC.createGain(),t=AC.currentTime;o.frequency.value=f;e.gain.setValueAtTime(.2,t);e.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(e);e.connect(mg);o.start(t);o.stop(t+.25)}
function au(){if(AC){AC.resume();return}
 AC=new(window.AudioContext||window.webkitAudioContext)();mg=AC.createGain();ag=AC.createGain();mg.connect(AC.destination);ag.connect(AC.destination);av();
 const b=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 const n=AC.createBufferSource(),f=AC.createBiquadFilter(),ng=AC.createGain();n.buffer=b;n.loop=true;f.type='lowpass';f.frequency.value=350;ng.gain.value=.18;n.connect(f);f.connect(ng);ng.connect(ag);n.start();
 const ch=[[220,277,330],[196,247,294],[175,220,262],[196,247,294]];let ci=0;
 const pad=()=>ch[ci++%4].forEach(fr=>{const o=AC.createOscillator(),e=AC.createGain(),t=AC.currentTime;o.frequency.value=fr;e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(.1,t+1.5);e.gain.linearRampToValueAtTime(0,t+4);o.connect(e);e.connect(mg);o.start(t);o.stop(t+4.1)});
 pad();setInterval(pad,3500);
 const bird=()=>{if(AC.state=='running'){const o=AC.createOscillator(),e=AC.createGain(),t=AC.currentTime,f0=2000+Math.random()*1500;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f0*1.5,t+.1);o.frequency.exponentialRampToValueAtTime(f0*.9,t+.2);e.gain.setValueAtTime(.05,t);e.gain.exponentialRampToValueAtTime(.001,t+.25);o.connect(e);e.connect(ag);o.start(t);o.stop(t+.3)}setTimeout(bird,1500+Math.random()*4000)};bird()}
