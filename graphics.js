/* ---- настройки графики ---- */
function ap(){const g=S.g;R.setPixelRatio([0,.3,.55,1,Math.min(devicePixelRatio,2)][g]);rs();
 post=g>2;sun.castShadow=!!S.sh&&g>1;sc.fog.near=g<2?10:40;sc.fog.far=g<2?60:170;cv.style.imageRendering=g<3?'pixelated':'auto';
 N.forEach((n,i)=>n.g.visible=i<[0,0,4,8,14][g]);T.forEach(x=>x.visible=g>1);
 Q('[data-g]').forEach(b=>b.classList.toggle('on',b.dataset.g==g))}
