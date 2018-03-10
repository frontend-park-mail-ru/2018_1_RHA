const fs = require("fs");
const pug = require("pug");
const path = require("path");
const DATA = path.resolve("./public/");

console.log("Baking...");

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


console.log("Baked!");