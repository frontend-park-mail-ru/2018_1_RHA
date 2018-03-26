import Section from './baseView.js';
import RegisterForm from '../forms/registerForm.js';
import UserController from '../../modules/userController.js';
import sectionSwitcher from '../../application.js';

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

        this.registerForm.setOnSubmit( () => {
            const userData = this.registerForm.getData();
            if (userData === null) {
                return;
            }
            const jsonUserData = JSON.stringify(userData);
            UserController.register(jsonUserData, (err, resp) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(err, resp);
                resp.then(
                    data => {
                        switch (data.message) {
                            case 'SUCCESSFULLY_REGISTERED':
                                sectionSwitcher.changeSection('menuSection', root);
                                break;
                            case 'ALREADY_AUTHENTICATED':
                                sectionSwitcher.changeSection('menuSection', root);
                                break;
                            default:
                                this.registerForm.Email.setError("Not unique email");
                        }
                    }
                );
                // UserController.checkAuth( (isAuth) => {
                //     if (isAuth) {
                //         sectionSwitcher.changeSection('menuSection', root);
                //     }
                // });
            });

        });

        return this.register;
    }
}
