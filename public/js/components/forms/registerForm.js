import Form from './form.js';
import Input from '../blocks/input/input.js';
import Validator from '../../modules/validator.js';
// validator
// и какие-то глобальные переменные
/**
 * Class representing registration form
 */
export default class RegisterForm extends Form {
	/**
	 * creates RegisterForm
	 */
	constructor() {
		super();
	}

	/**
	 * @return {HTMLDivElement}
	 */
	render() {
		this.Email = new Input({
			type: 'text',
			placeholder: 'email',
			id: 'registerEmail'
		});

		this.Name = new Input({
			type: 'text',
			placeholder: 'name',
			id: 'registerName'
		});

		this.Password = new Input({
			type: 'password',
			placeholder: 'password',
			id: 'registerPass'
		});

		this.ConfirmPassword = new Input({
			type: 'password',
			placeholder: 'confirm password',
			id: 'registerPass2'
		});

		this.InputSubmit = new Input({
			type: 'submit',
			value: 'Sign Up',
			id: 'registerSubmit'
		});


		this.Email.setOnInputChange(() => {
			Validator.checkMail(this.Email);
		});
		this.Name.setOnInputChange(() => {
			Validator.checkName(this.Name);
		});
		this.Password.setOnInputChange(() => {
			Validator.checkPass(this.Password);
		});
		this.ConfirmPassword.setOnInputChange(() => {
			Validator.checkConfirm(this.Password, this.ConfirmPassword);
		});

		this.formElement.appendChild(this.Email.render());
		this.formElement.appendChild(this.Name.render());
		this.formElement.appendChild(this.Password.render());
		this.formElement.appendChild(this.ConfirmPassword.render());
		this.formElement.appendChild(this.InputSubmit.render());

		return this.formElement;
	}

	getData() {
		const name = this.Name.getData();
		const email = this.Email.getData();
		const password = this.Password.getData();
		if (name === '' || email === '' || password === '') {
			return null;
		}
		return {
			username: name,
			email: email,
			password: password
		};
	}



	setOnSubmit(callbackfn) {
		this.formElement.addEventListener('submit', (ev) => {
			ev.preventDefault();
			callbackfn();
		});
	}
}
