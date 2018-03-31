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
        //this.allowed = true;
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

        this.backLink = document.createElement('div');
        this.backLink.innerHTML = generateLogin();

        this.login.appendChild(this.formHeader);
        this.login.appendChild(this.loginForm.render());
        this.login.appendChild(this.backLink);
        this.loginForm.setOnSubmit(() => {
            const userData = this.loginForm.getData();
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
        bus.on('alreadyAuth', (error) => {
            alert(error.payload);
        });
        bus.on('wrong', (error) => {
            this.loginForm.Email.setError(error.payload);
        });
        bus.on('user:authorized', ((data) => {
            this.allowed = true;
        }));

        bus.on('user:unauthorized', ((data) => {
            this.allowed = false;
        }));
    }
}
