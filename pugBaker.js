const fs = require("fs");
const pug = require("pug");
const path = require("path");
const DATA = path.resolve("public/");

console.log("Baking...");
console.log(DATA);
function bake(path, fileName, functionName, jsName)
{
    let fullPath = DATA + path;
    let templateFunc = pug.compileFileClient(fullPath + fileName, {name: functionName});
    fs.writeFileSync(fullPath + jsName, templateFunc);
}

bake("/js2/components/views/modalView/", "modalSection.pug", "generateModal", "modalTemplate.js");
bake("/js2/components/views/ratingView/", "rating.pug", "generateRating", "ratingTemplate.js");console.log("Baked!");