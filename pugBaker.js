
const fs = require('fs');
const pug = require('pug');
const path = require('path');
const DATA = path.resolve('public/');

console.log('Baking...');
console.log(DATA);
function bake(path, fileName, functionName, jsName)
{
	let fullPath = DATA + path;
	let templateFunc = pug.compileFileClient(fullPath + fileName, {name: functionName});
	fs.writeFileSync(fullPath + jsName, templateFunc);
}


bake('/js/modules/game/animation/attack/', 'attackAnimation.pug', 'generateAttack', 'attackTemplate.js');
bake('/js/components/views/profileView/', 'profile.pug', 'generateProfile', 'profileTemplate.js');
bake('/js/components/views/gameView/', 'gameTemplate.pug', 'generateCanvas', 'gameTemplate.js');
bake('/js/components/views/ratingView/', 'rating.pug', 'generateRating', 'ratingTemplate.js');
bake('/js/components/blocks/decorations/', 'lamp.pug', 'generateLamp', 'lampTemplate.js');
bake('/js/components/blocks/decorations/', 'screw.pug', 'generateScrew', 'screwTemplate.js');
bake('/js/components/blocks/input/', 'input.pug', 'generateInput', 'inputTemplate.js');
bake('/js/components/views/menuView/', 'menu.pug', 'generateMenu', 'menuTemplate.js');
bake('/js/components/views/loginView/', 'login.pug', 'generateLogin', 'loginTemplate.js');
bake('/js/components/views/registerView/', 'register.pug', 'generateRegister', 'registerTemplate.js');
console.log('Baked!');

