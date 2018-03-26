import Button from '../blocks/button.js';
import Section from './section.js';

import sectionSwitcher from '../../application.js';

/**
 * Class represents Section with main Play button
 */
export default class PlaySection extends Section {
    /**
     * Creates generic section and wraps into parent element
     * @param {HTMLDivElement} parent – parent element
     */
    constructor(parent) {
        super();
        this.parent = parent;
    }

    /**
     * Renders and returns PlaySection DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        this.playButton = new Button('button', 'Play', );
        this.playButton.setOnClick(() => {
            sectionSwitcher.changeSection('modalSection', root);
        });

        this.playElement = document.createElement('div');
        this.playElement.appendChild(this.playButton.render());

        return this.playElement;
    }
}
