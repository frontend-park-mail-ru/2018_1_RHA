import renderDom from '../components/render/render.js';

class SectionSwitcher {
    constructor() {}

    setSections(sections) {
        this.sections = sections;
    }

    static changeSection(newSection, rootForElement) {
        if (this.sections[newSection]) {
            renderDom(this.sections[newSection].render(), rootForElement);
        }
    }
}

const sectionSwitcher = new SectionSwitcher();

export {sectionSwitcher};

export default SectionSwitcher;


