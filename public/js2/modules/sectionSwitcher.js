import {Sections} from '../application.js';
import renderDom from '../components/render/render.js';

class SectionSwitcher {
    constructor() {
    }

    static changeSection(newSection, rootForElement) {
        if (Sections[newSection]) {
            renderDom(Sections[newSection].render(), rootForElement);
        }
    }
}

export default SectionSwitcher;


