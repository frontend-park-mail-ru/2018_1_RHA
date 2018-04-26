import renderDOM from '../components/render/render.js';

/**
 * Class represents set of tools for switching sections
 */
class SectionSwitcher {
	constructor() {}

	/**
     * Switches sections
     * @param newSection
     * @param rootForElement
     */
	changeSection(newSection, rootForElement) {
		renderDOM(newSection, rootForElement);
	}
}

const sectionSwitcher = new SectionSwitcher();

export {sectionSwitcher};

export default SectionSwitcher;


