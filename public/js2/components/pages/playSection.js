import Button from '../blocks/button.js';
import Section from './section.js';

import sectionSwitcher from '../../application.js';

export default class PlaySection extends Section {
    constructor(parent) {
        super();
        this.parent = parent;
    }

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
