import Button from '../blocks/button.js';
import Section from './section.js';
// import SectionSwitcher from '../../modules/sectionSwitcher.js';
import sectionSwitcher from '../../application.js';

export default class PlaySection extends Section {
    constructor(parent) {
        super();
        this.parent = parent;
    }

    render() {
        this.playButton = new Button();
        this.playButton.render().classList.add('menu__button');
        this.playButton.render().classList.add('btn-up');
        this.playButton.setOnClick(() => {
            sectionSwitcher.changeSection('modalSection', root);
        });

        this.playElement = document.createElement('div');
        this.playElement.classList.add('btn-wrapper');
        this.playElement.appendChild(this.playButton.render());

        return this.playElement;
    }
}
