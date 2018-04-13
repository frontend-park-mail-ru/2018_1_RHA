import Form from './form.js';
import Input from '../blocks/input.js';
import Validator from '../../modules/validator.js';

/**
 * Class representing form to change user data
 */
export default class ChangeForm extends Form {
	/**
	 * creates ChangeForm
	 */
	constructor() {
		super();
	}

	/**
	 * returns data of the form
	 * @return {{oldp: string, newp: string}}
	 */
	getData() {
		return {
			oldp: this.OldPassword.getData(),
			newp: this.Password.getData()
		};
	}

	/**
	 * @return {HTMLDivElement}
	 */
	render() {

		this.OldPassword = new Input({
			type: 'password',
			placeholder: 'old password'
		});

		this.Password = new Input({
			type: 'password',
			placeholder: 'new password'
		});

		this.RepeatPassword = new Input({
			type: 'password',
			placeholder: 'repeat password'
		});

		this.InputSubmit = new Input({
			type: 'submit',
			value: 'Save'
		});

		//TODO:: бэк
		this.OldPassword.setOnInputChange(() => {
			Validator.checkPass(this.OldPassword);
		});
		this.Password.setOnInputChange(() => {
			Validator.checkPass(this.Password);
		});
		this.RepeatPassword.setOnInputChange(() => {
			Validator.checkConfirm(this.Password, this.RepeatPassword);
		});

		this.formElement.appendChild(this.OldPassword.render());
		this.formElement.appendChild(this.Password.render());
		this.formElement.appendChild(this.RepeatPassword.render());
		this.formElement.appendChild(this.InputSubmit.render());


		return this.formElement;
	}

	/**
	 * Sets submit listener
	 * @param callbackfn
	 */
	setOnSubmit(callbackfn) {
		this.formElement.addEventListener('submit', (ev) => {
			ev.preventDefault();
			callbackfn();
		});
	}
}