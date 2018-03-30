import Section from './baseView.js';
import RegisterForm from '../forms/registerForm.js';
import UserController from '../../modules/userController.js';
import sectionSwitcher from '../../application.js';
import bus from "../../modules/bus.js";
import Button from "../blocks/button.js";
import router from "../../application.js";

/**
 * Class represents Section with Registration Form
 */
export default class RegisterSection extends Section {
    /**
     * Creates generic Section and wraps into Parent element
     * @param parent
     */
    constructor(parent) {
        super();
        if (parent) {
            this.register = document.createElement('div');
            parent.appendChild(this.register);
        }
    }

    /**
     * Renders and returns RegisterSection DOM element
     * @return {HTMLDivElement}
     */
    render() {
        this.formHeader = document.createElement('h2');
        this.formHeader.innerText = 'Sign Up';

        if (!this.parent) {
            this.register = document.createElement('div');
        }
        this.register.id = 'registerSection';
        this.registerForm = new RegisterForm();

        this.register.appendChild(this.formHeader);
        this.register.appendChild(this.registerForm.render());

        this.backLink = document.createElement('a');
        this.backLink.setAttribute('href', '/landing');
        this.backLink.innerText = 'Back to menu';

        this.register.appendChild(this.backLink);

        this.registerForm.setOnSubmit( () => {
            const userData = this.registerForm.getData();
            if (userData === null) {
                return;
            }
            const jsonUserData = JSON.stringify(userData);
            bus.emit("user:signup", jsonUserData);
            bus.on("not_unique", (error) => {
                this.registerForm.Email.setError(error.payload);
            })

        });

        return this.register;
    }
}
