const fs = require("fs");
const pug = require("pug");
const path = require("path");
const DATA = path.resolve("public/modules/");

console.log("Baking...");
console.log(DATA);
function bake(path, fileName, functionName, jsName)
{
    let fullPath = DATA + path;
    let templateFunc = pug.compileFileClient(fullPath + fileName, {name: functionName});
    fs.writeFileSync(fullPath + jsName, templateFunc);
}

bake("/blocks/footer/", "footer.pug", "generateFooter", "footerTemplate.js");
bake("/blocks/menu/", "menu.pug", "generateMenu", "menuTemplate.js");
bake("/blocks/play/", "play.pug", "generatePlay", "playTemplate.js");
bake("/blocks/video/", "video.pug", "generateVideo", "videoTemplate.js");
bake("/blocks/modal/", "modal.pug", "generateModal", "modalTemplate.js");
bake("/blocks/leaderboard/", "leaderboard.pug", "generateBoard", "boardTemplate.js");
bake("/blocks/settings/", "settings.pug", "generateSetting", "settingsTemplate.js");


console.log("Baked!");