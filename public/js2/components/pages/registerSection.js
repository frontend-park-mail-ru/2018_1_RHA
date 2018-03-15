import Section from './section.js';
import RegisterForm from '../forms/registerForm.js';
import UserController from '../../modules/userController.js';
//import sectionSwitcher from '../../modules/sectionSwitcher.js';
//import {sectionSwitcher} from "../../modules/sectionSwitcher";
import sectionSwitcher from '../../application.js';

export default class RegisterSection extends Section {
    constructor(parent) {
        super();
        if (parent) {
            this.register = document.createElement('div');
            parent.appendChild(this.register);
        }
    }

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

        this.registerForm.setOnSubmit(() => {
            const userData = this.registerForm.checkState();
            if (UserController.register(userData)) {
                sectionSwitcher.changeSection('menuSection', parent);
            }
        });

        return this.register;
    }
}
