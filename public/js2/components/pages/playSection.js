import Button from '../blocks/button.js';
import Section from './section.js';
import SectionSwitcher from '../../modules/sectionSwitcher.js';

class PlaySection extends Section {
    constructor(parent) {
        super();
        this.parent = parent;
    }

    render() {
        this.playButton = new Button();
        this.playButton.classList.add('menu__button');
        this.playButton.classList.add('btn-up');
        this.playButton.setOnClick(() => {
            SectionSwitcher.changeSection('modalSection', root);
        });

        this.playElement = document.createElement('div');
        this.playElement.classList.add('btn-wrapper');
        this.playElement.appendChild(this.playButton.render());

        return this.playElement;
    }
}

export default PlaySection;