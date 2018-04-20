/* eslint-disable no-undef */
import Section from '../baseView.js';
import LoginForm from '../../forms/loginForm.js';
import bus from '../../../modules/bus.js';
import User from '../../../modules/userModel.js';

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
	render() {

		this.login = document.createElement('div');
		this.login.innerHTML = generateLogin();
		this.after = this.login.getElementsByClassName('button')[0];

		this.loginForm = new LoginForm();

		this.login.firstChild.insertBefore(this.loginForm.render(), this.after);


		this.loginForm.setOnSubmit(() => {
			const userData = this.loginForm.getData();
			if (userData === null) {
				this.loginForm.Email.setError('empty fields');
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
