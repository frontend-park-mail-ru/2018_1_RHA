import Section from '../baseView.js';
import LoginForm from '../../forms/loginForm.js';
import bus from "../../../modules/bus.js";
import User from "../../../modules/userModel.js";

/** Class represents section with Login Form */
export default class LoginSection extends Section {
    /**
     * Creates generic section
     */
    constructor() {
        super();
        this.sign();
    }

    /**
     * Renders and returns LoginSection DOM element
     * @return {HTMLDivElement | *}
     */
    render(parent) {
        this.formHeader = document.createElement('h2');
        this.formHeader.innerText = 'Sign In';

        this.loginForm = new LoginForm();

        this.login = document.createElement('div');
        if (parent) {
            parent.appendChild(this.login);
        }

        this.login.classList.add('form-wrapper');

        this.backWrap = document.createElement('div');
        this.backLink = document.createElement('a');
        this.backLink.innerText = 'Back to menu';
        this.backLink.setAttribute('href', '/');
        this.backWrap.appendChild(this.backLink);
        this.backWrap.classList.add('button');

        this.login.appendChild(this.formHeader);
        this.login.appendChild(this.loginForm.render());
        this.login.appendChild(this.backWrap);
        this.loginForm.setOnSubmit(() => {
            const userData = this.loginForm.getData();
            if (userData === null) {
                this.loginForm.Email.setError("empty fields");
                return;
            }
            const jsonUserData = JSON.stringify(userData);
            console.log(jsonUserData);
            bus.emit('user:login', jsonUserData);
        });
        return this.login;
    }

    allowed() {
        return !User.isAuthorized();
    }

    sign() {
        bus.on('login-error', (error) => {
            this.loginForm.Email.setError(error.payload);
        });
    }
}
