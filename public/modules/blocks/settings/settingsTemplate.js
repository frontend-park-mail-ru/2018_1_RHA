function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function generateSetting(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (email) {;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Cdiv class=\"menu fadeIn-Out hidden\" id=\"settings\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "Your personal settings\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Cform class=\"insSets\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Clabel for=\"setting_email\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Cinput" + (" id=\"setting_email\" type=\"email\""+pug_attr("placeholder", {email}, true, false)) + "\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Clabel for=\"setting_password\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "Password:\u003C\u002Flabel\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Cinput id=\"setting_password\" type=\"password\"\u002F\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Clabel for=\"setting_avatar\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "Avatar:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Cimg id=\"avatar_image\" src=\"\u002Fhome\u002Fchapay\u002FЗагрузки\u002FNapoleon.jpg\"\u002F\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Cinput id=\"setting_avatar\" type=\"image\" src=\"\u002Fhome\u002Fchapay\u002FЗагрузки\u002FNapoleon.jpg\"\u002F\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Cbutton class=\"menu__button\" id=\"ApplyChange\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "Apply\u003C\u002Fbutton\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "\u003Cbutton class=\"menu__button\" id=\"setToMenu\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002Fhome\u002Fegor\u002FProjects\u002Ffrontend\u002F2018_1_RHA\u002Fpublic\u002Fmodules\u002Fblocks\u002Fsettings\u002Fsettings.pug";
pug_html = pug_html + "Menu\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";}.call(this,"email" in locals_for_with?locals_for_with.email:typeof email!=="undefined"?email:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}