/* eslint-disable no-undef */
import Section from '../baseView.js';
import RegisterForm from '../../forms/registerForm.js';

import bus from '../../../modules/bus.js';
import User from '../../../modules/userModel.js';
let generateRegister = require('./register.pug');



/**
 * Class represents Section with Registration Form
 */
export default class RegisterSection extends Section {
	/**
     * Creates generic Section and wraps into Parent element
     * @param parent
     */
	constructor() {
		super();
		User.isAuthorized();
		this.sign();
	}

	/**
     * Renders and returns RegisterSection DOM element
     * @return {HTMLDivElement}
     */
	render() {
		this.register = document.createElement('div');
		this.register.classList.add('regist-wrapper');
		this.register.innerHTML = generateRegister();
		this.registerForm = new RegisterForm();
		this.after = this.register.getElementsByClassName('button')[0];
		this.register.firstChild.insertBefore(this.registerForm.render(), this.after);
		this.registerForm.setOnSubmit( () => {

			const userData = this.registerForm.getData();
			console.log(this.registerForm.getStatus());
			if (userData === null || !this.registerForm.getStatus()) {
				this.registerForm.Email.setError('Empty fields');
				return;
			}
			const jsonUserData = JSON.stringify(userData);
			bus.emit('user:signup', jsonUserData);
			bus.on('signup-error', (error) => {
				this.registerForm.Email.setError(error.payload);
			});

		});
		return this.register;
	}

	allowed() {
		return !User.isAuthorized();
	}

	sign() {
		bus.on('signup-error', (error) => {
			this.registerForm.Email.setError(error.payload);
		});

	}
}
