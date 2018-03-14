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
        sectionSwitcher.changeSection('loginSection', this.innerWrapper);
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
