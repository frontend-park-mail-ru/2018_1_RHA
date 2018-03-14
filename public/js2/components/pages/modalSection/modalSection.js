'use strict';
import Section from '../section.js';
import Button from "../../blocks/button.js";
import sectionSwitcher from '../../../application.js';

export default class ModalSection extends Section {
    constructor(lSection, rSection) {
        super();
        this.loginSection = lSection;
        this.registerSection = rSection;
    }

    render() {
        // формы-секции с оберткой-корнем
        this.innerWrapper = document.createElement('div');
        this.innerWrapper.appendChild(this.loginSection.render());
        this.innerWrapper.appendChild(this.registerSection.render());

        // главная обертка
        this.modalElement = document.createElement('div');
        this.modalElement.innerHTML = generateModal();
        this.modalElement.children[0].children[0].appendChild(this.innerWrapper);

        // переключатели секций
        const listItems = this.modalElement.getElementsByTagName('li');
        this.switchToLoginButton = new Button('button', 'Sign In', listItems[0]);
        this.switchToLoginButton.setOnClick(() => {
            sectionSwitcher.changeSection('loginSection', this.innerWrapper);
        });
        this.switchToRegisterButton = new Button('button', 'Sign Up', listItems[1]);
        this.switchToRegisterButton.setOnClick(() => {
            sectionSwitcher.changeSection('registerSection', this.innerWrapper);
        });
        listItems[0].appendChild(this.switchToLoginButton.render());
        listItems[1].appendChild(this.switchToRegisterButton.render());


        return this.modalElement;
    }
}
//
//
// function pug_rethrow(n, e, r, t) {
//     if (!(n instanceof Error)) throw n;
//     if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;
//     try {
//         t = t || require("fs").readFileSync(e, "utf8")
//     } catch (e) {
//         pug_rethrow(n, null, r)
//     }
//     var i = 3, a = t.split("\n"), o = Math.max(r - i, 0), h = Math.min(a.length, r + i),
//         i = a.slice(o, h).map(function (n, e) {
//             var t = e + o + 1;
//             return (t == r ? "  > " : "    ") + t + "| " + n
//         }).join("\n");
//     throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n
// }
//
// function generateModal(locals) {
//     var pug_html = "", pug_mixins = {}, pug_interp;
//     var pug_debug_filename, pug_debug_line;
//     try {
//         ;pug_debug_line = 1;
//         pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDesktop\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs2\u002Fcomponents\u002Fpages\u002FmodalSection\u002FmodalSection.pug";
//         pug_html = pug_html + "\u003Cdiv class=\"modalDialog\" id=\"openModal\"\u003E";
//         ;pug_debug_line = 2;
//         pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDesktop\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs2\u002Fcomponents\u002Fpages\u002FmodalSection\u002FmodalSection.pug";
//         pug_html = pug_html + "\u003Cdiv class=\"mainModPart\" id=\"mainModPart\"\u003E";
//         ;pug_debug_line = 3;
//         pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDesktop\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs2\u002Fcomponents\u002Fpages\u002FmodalSection\u002FmodalSection.pug";
//         pug_html = pug_html + "\u003Cul class=\"tab-group\"\u003E";
//         ;pug_debug_line = 4;
//         pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDesktop\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs2\u002Fcomponents\u002Fpages\u002FmodalSection\u002FmodalSection.pug";
//         pug_html = pug_html + "\u003Cli class=\"tab active\"\u003E\u003C\u002Fli\u003E";
//         ;pug_debug_line = 5;
//         pug_debug_filename = "\u002FUsers\u002Fpetrosadaman\u002FDesktop\u002Ffront\u002F2018_1_RHA\u002Fpublic\u002Fjs2\u002Fcomponents\u002Fpages\u002FmodalSection\u002FmodalSection.pug";
//         pug_html = pug_html + "\u003Cli class=\"tab active\"\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
//     } catch (err) {
//         pug_rethrow(err, pug_debug_filename, pug_debug_line);
//     }
//     ;
//     return pug_html;
// }