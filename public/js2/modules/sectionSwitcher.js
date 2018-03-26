import renderDOM from '../components/render/render.js';

class SectionSwitcher {
    constructor() {}

    setSections(sections) {
        this.sections = sections;
    }

    changeSection(newSection, rootForElement) {
        if (this.sections[newSection]) {
            renderDOM(this.sections[newSection].render(), rootForElement);
        }
    }
}

const sectionSwitcher = new SectionSwitcher();

export {sectionSwitcher};

export default SectionSwitcher;


