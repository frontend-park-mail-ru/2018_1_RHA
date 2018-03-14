import Section from './section.js';
import RegisterForm from '../forms/registerForm.js';
import UserController from '../../modules/userController.js';
import sectionSwitcher from '../../modules/sectionSwitcher.js';

export default class RegisterSection extends Section {
    constructor() {
        super();
    }

    render() {
        this.formHeader = document.createElement('h2');
        this.formHeader.innerText = 'Sign Up';

        this.register = document.createElement('div');
        this.register.id = 'registerSection';
        this.registerForm = new RegisterForm();

        this.register.appendChild(this.formHeader);
        this.register.appendChild(this.registerForm.render());

        this.registerForm.setOnSubmit(() => {
            const userData = this.registerForm.checkState();
            if (UserController.register(userData)) {
                sectionSwitcher.changeSection('menuSection', 'root1');
            }
        });

        return this.register;
    }
}
