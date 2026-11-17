const $=i=>document.getElementById(i),Q=s=>document.querySelectorAll(s),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
/* ---- сохранение ---- */
const S={g:3,sh:1,vol:.7,amb:.6,sens:.5,js:1,zone:.45,inv:0,left:0,coins:0,xp:0,it:{},done:{}};
try{Object.assign(S,JSON.parse(localStorage.ruff1||'{}'))}catch(e){}
const save=()=>{try{localStorage.ruff1=JSON.stringify(S)}catch(e){}};
const lvl=()=>1+Math.floor(S.xp/40);
