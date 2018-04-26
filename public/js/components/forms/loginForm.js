import Form from './form.js';
import Input from '../blocks/input/input.js';
import Validator from '../../modules/validator.js';


/**
 * Class representing Login Form
 */
export default class LoginForm extends Form {
	/**
     * Creates generic form
     */
	constructor() {
		super();
	}

	/**
     * Return input data of the form
     * @return {{name: null, email: string, password: string}}
     */
	getData() {
		const email = this.Email.getData();
		const password = this.Password.getData();
		if (email === '' || password === '') {
			return null;
		}
		return {
			email: email,
			password: password
		};
	}

	/**
     * Renders and returns form DOM element
     * @return {*}
     */
	render() {
		this.Email = new Input({
			type: 'text',
			placeholder: 'email',
			id: 'loginEmail'
		});

		this.Password = new Input({
			type: 'password',
			placeholder: 'password',
			id: 'loginPassword'
		});

		this.InputSubmit = new Input({
			type: 'submit',
			value: 'Sign In',
			id: 'loginSubmit'
		});

		this.Email.setOnInputChange(() => {
			Validator.checkMail(this.Email);
		});

		this.Password.setOnInputChange(() => {
			Validator.checkPass(this.Password);
		});


		this.formElement.appendChild(this.Email.render());
		this.formElement.appendChild(this.Password.render());
		this.formElement.appendChild(this.InputSubmit.render());

		return this.formElement;
	}

	/**
     * Defines behaviour on submit
     * @param {function} callbackfn – submit handler
     */
	setOnSubmit(callbackfn) {
		this.formElement.addEventListener('submit', (ev) => {
			ev.preventDefault();
			callbackfn();
		});
	}

}
