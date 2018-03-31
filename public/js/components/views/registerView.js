import Section from './baseView.js';
import RegisterForm from '../forms/registerForm.js';

import bus from "../../modules/bus.js";
import User from "../../modules/userModel.js";



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
        User.isAuthorized();
        this.sign();
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
            bus.on("signup-error", (error) => {
                this.registerForm.Email.setError(error.payload);
            })

        });

        return this.register;
    }

    allowed() {
        return !User.isAuthorized();
    }

    sign() {
        bus.on('alreadyAuth', (error) => {
            alert(error.payload);
        });
        bus.on('wrong', (error) => {
            this.registerForm.Email.setError(error.payload);
        });
        bus.on('user:authorized', ((data) => {
            this.allowed = true;
        }));

        bus.on('user:unauthorized', ((data) => {
            this.allowed = false;
        }));
    }
}
