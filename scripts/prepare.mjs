import fs from 'fs';
fs.mkdirSync('www/lib',{recursive:true});
fs.copyFileSync('node_modules/three/build/three.min.js','www/lib/three.min.js');
fs.copyFileSync('node_modules/three/examples/js/loaders/GLTFLoader.js','www/lib/GLTFLoader.js');
console.log('three.js скопирован в www/lib');
