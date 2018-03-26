import renderDOM from '../components/render/render.js';

/**
 * Class represents set of tools for switching sections
 */
class SectionSwitcher {
    constructor() {}

    /**
     * Defines set of section to work with
     * @param sections
     */
    setSections(sections) {
        this.sections = sections;
    }

    /**
     * Switches sections
     * @param newSection
     * @param rootForElement
     */
    changeSection(newSection, rootForElement) {
        if (this.sections[newSection]) {
            renderDOM(this.sections[newSection].render(), rootForElement);
        }
    }
}

const sectionSwitcher = new SectionSwitcher();

export {sectionSwitcher};

export default SectionSwitcher;


