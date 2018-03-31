'use strict';
import Section from '../baseView.js';
import Button from "../../blocks/button.js";
import User from "../../../modules/userModel.js";

/**
 * Class represents Section with Register and Login Sections
 */
export default class ModalSection extends Section {
    /**
     * Creates Generic section and wraps login and register sections
     * @param lSection – login section
     * @param rSection – register section
     */
    constructor(lSection, rSection) {
        super();
        this.loginSection = lSection;
        this.registerSection = rSection;
    }

    /**
     * Renders and returns ModalSection DOM element
     * @return {HTMLDivElement | *}
     */
    render(parrent) {

        // формы-секции с оберткой-корнем
        this.innerWrapper = document.createElement('div');
        // this.innerWrapper.appendChild(this.loginSection.render());
        // this.innerWrapper.appendChild(this.registerSection.render());

        if (parrent) {
            parrent.appendChild(this.innerWrapper);
        }

        this.modalElement = document.createElement('div');
        this.modalElement.innerHTML = generateModal();
        this.modalElement.appendChild(this.innerWrapper);

        this.backLink = document.createElement('a');
        this.backLink.setAttribute('href', '/');
        this.backLink.innerText = 'Back';

        this.modalElement.appendChild(this.backLink);

        return this.modalElement;
    }

    allowed() {
        return !User.isAuthorized();
    }
}
