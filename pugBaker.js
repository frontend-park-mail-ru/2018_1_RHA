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


bake("/js/components/views/ratingView/", "rating.pug", "generateRating", "ratingTemplate.js");
bake("/js/components/views/menuView/", "menu.pug", "generateMenu", "menuTemplate.js");
bake("/js/components/views/loginView/", "login.pug", "generateLogin", "loginTemplate.js");
bake("/js/components/views/profileView/", "profile.pug", "generateProfile", "profileTemplate.js");
console.log("Baked!");
