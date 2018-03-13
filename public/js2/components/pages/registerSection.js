import Section from './section.js';
import RegisterForm from '../forms/registerForm.js';
import UserController from '../../modules/userController.js';
import SectionSwitcher from '../../modules/sectionSwitcher.js';

class RegisterSection extends Section {
    constructor() {
        super();
    }

    render() {
        this.register = document.createElement('div');
        this.register.id = 'registerSection';
        this.registerForm = new RegisterForm();

        this.register.appendChild(this.registerForm.render());

        this.registerForm.setOnSubmit(() => {
            const userData = this.registerForm.checkState();
            if (UserController.register(userData)) {
                SectionSwitcher.changeSection('menuSection', 'root1');
            }
        });

        return this.register;
    }
}

export default RegisterSection;