/* ---- интерфейс ---- */
let st='menu',from='menu';
const show=id=>Q('.scr').forEach(s=>s.hidden=s.id!=id);
function toast(m){const t=$('toast');t.textContent=m;t.style.opacity=1;clearTimeout(toast.i);toast.i=setTimeout(()=>t.style.opacity=0,2600)}
function flash(r){const f=$('fl');f.style.background=r?'#c00':'#fff';f.style.transition='none';f.style.opacity=.8;requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.transition='opacity .8s';f.style.opacity=0}))}
const hud=()=>$('st').textContent='🪙 '+S.coins+'  ⭐ ур.'+lvl()+' ('+S.xp%40+'/40)';
const IT=[['bal','🧣','Балаклава',15,'+20% монет за руф'],['cut','✂️','Болторез',20,'вскрывает замок за 2 с'],['pl','🔧','Плоскогубцы',30,'вскрывают замок за 3 с'],['gl','🧤','Перчатки',25,'круги на краю крупнее и дольше'],['key','🔑','Ключ от замка',100,'открывает замки мгновенно']];
function shop(){const l=$('sl');l.innerHTML='';IT.forEach(([k,e,n,p,d])=>{const b=document.createElement('button');b.className='it';b.innerHTML=e+' '+n+' — '+(S.it[k]?'✓ куплено':p+' 🪙')+'<small>'+d+'</small>';
 b.onclick=()=>{if(S.it[k])return;if(S.coins<p)return toast('Не хватает монет');S.coins-=p;S.it[k]=1;save();hud();shop();bp(880)};l.appendChild(b)})}
const LOG=[['Бета 1.2',['Проект разбит на модули (www/js), сборка APK через GitHub Actions','Подъезд: пролёты по этажам с площадками и дверями квартир (двери пока не открываются)']],['Бета 1.1',['Шейдеры (графика 3–4): закатное небо, виньетка, цветокор и «страх высоты» у края крыши','Подъезды: заходишь в дверь сам, внутри холл и длинная лестница до крыши, спуск тоже пешком (кнопки «Залезть» нет)','Видны руки и ноги, перчатки меняют цвет рук','Можно упасть с крыши (шагнуть за край или сорваться в osu!): смерть и −50% монет']],['Бета 1',['Город: 16 зданий от 5 до 20 этажей, замки на всех выше 5 этажей','Машины, люди (модели из блоков, свои .glb подхватываются из папки models/), качающиеся деревья','Руфинг: залезть, 📸 снимок, монеты и уровни (больше здание — больше монет)','У края крыши 50% шанс ветра: мини-игра как osu!, срыв = смерть и −50% монет','Магазин: болторез 20, плоскогубцы 30, балаклава 15, перчатки 25, ключ 100','Настройки: графика 1–4, тени, звук, шум, чувствительность, HUD, лево/праворукий, язык (Google Translate)','Музыка и фоновый шум (птицы, город) создаются кодом','Сохранение в localStorage']]];
$('lg').innerHTML=LOG.map(([v,a])=>'<h3>'+v+'</h3><ul>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ul>').join('');
Q('[data-k]').forEach(e=>{e.value=S[e.dataset.k];e.oninput=()=>{S[e.dataset.k]=+e.value;save();av()}});
Q('[data-t]').forEach(b=>{const k=b.dataset.t,L=b.dataset.l.split('|'),r=()=>b.textContent=L[S[k]?1:0];r();b.onclick=()=>{S[k]=S[k]?0:1;save();ap();r()}});
Q('[data-g]').forEach(b=>b.onclick=()=>{S.g=+b.dataset.g;save();ap()});
$('bst').onclick=()=>show('set');$('bb1').onclick=()=>show('menu');$('bl').onclick=()=>show('log');$('bb3').onclick=()=>show('menu');
$('bs').onclick=()=>{if(st!='play')return;st='shop';shop();show('shop')};$('bb2').onclick=()=>{st='play';show('hud')};
function pause(){if(st!='play')return;st='menu';jid=cid=null;vx=vy=0;$('jb').style.display='none';show('menu')}
$('bm').onclick=pause;addEventListener('keydown',e=>{keys[e.code]=1;if(e.code=='Escape')pause()});addEventListener('keyup',e=>keys[e.code]=0);
$('bp').onclick=()=>{au();try{document.documentElement.requestFullscreen({navigationUI:'hide'}).then(()=>screen.orientation.lock('landscape').catch(()=>{})).catch(()=>{})}catch(e){}
 if(st=='menu')st='play';show('hud');hud()};
