function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function generateProfile(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (user) {;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"div__avatar-wrapper\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Cimg class=\"avatar\" src=\"default.jpg\" id=\"avatar\"\u002F\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Ctable class=\"table__profile\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Ctr class=\"tr__profile\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "Email:\u003C\u002Ftd\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.email) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Ctr class=\"tr__profile\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "Rating:\u003C\u002Ftd\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDocuments\u002F2Технопарк\u002F2 sem\u002FJS\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs\u002Fcomponents\u002Fviews\u002FprofileView\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.rating) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E";}.call(this,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}