import Section from '../section.js';
import LoginSection from '../loginSection.js';
import RegisterSection from '../registerSection.js';
import Button from "../../blocks/button.js";
import SectionSwitcher from '/public/js2/modules/sectionSwitcher.js';

class ModalSection extends Section {
    constructor(lSection, rSection) {
        super();
        this.loginSection = lSection;
        this.registerSection = rSection;
    }

    render() {
        // формы-секции с оберткой-корнем
        this.loginSection = new LoginSection();
        this.registerSection = new RegisterSection();
        this.innerWrapper = document.createElement('div');
        this.innerWrapper.appendChild(this.loginSection.render());
        this.innerWrapper.appendChild(this.registerSection.render());

        // переключатели секций
        const listItems = this.modalElement.getElementsByTagName('li');
        this.switchToLoginButton = new Button('button', 'Sign In', listItems[0]);
        this.switchToLoginButton.setOnClick(() => {
            SectionSwitcher.changeSection('loginSection', this.innerWrapper);
        });
        this.switchToRegisterButton = new Button('button', 'Sign Up', listItems[1]);
        this.switchToRegisterButton.setOnClick(() => {
            SectionSwitcher.changeSection('registerSection', this.innerWrapper);
        });
        listItems[0].appendChild(this.switchToLoginButton.render());
        listItems[1].appendChild(this.switchToRegisterButton.render());

        // главная обертка
        this.modalElement = document.createElement('div');
        this.modalElement.innerHTML = generateModal();
        this.modalElement.children[0].children[0].appendChild(this.innerWrapper.render());

        return this.modalElement;
    }
}

export default ModalSection;