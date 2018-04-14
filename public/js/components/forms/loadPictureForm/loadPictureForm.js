import Form from '../form.js';
import Input from '../../blocks/input/input.js';

/**
 * Class representing Load form
 */
export default class LoadForm extends Form {
	/**
	 * creates loadForm
	 * @param type
	 */
	constructor(type) {
		super();
	}

	/**
	 * returns data of loadForm
	 * @return {*}
	 */
	getData() {
		const avatar = this.UploadInput.getFormData();
		if (avatar === '') {
			return null;
		}
		return {
			avatar: avatar
		};
	}

	/**
	 * @return {HTMLDivElement}
	 */
	render() {
		this.UploadInput = new Input({
			type: 'file',
			placeholder: '',
			id: 'loadImageInput'
		});
		this.UploadSubmit = new Input({
			type: 'submit',
			value: 'Save picture',
			id: 'loadImageSubmit'
		});

		this.formElement.appendChild(this.UploadInput.render());
		this.formElement.appendChild(this.UploadSubmit.render());

		this.formElement.setAttribute('enctype', 'multipart/form-data');
		this.formElement.classList.add('form__loadFile');

		return this.formElement;
	}

	setOnSubmit(callbackfn) {
		this.formElement.addEventListener('submit', (ev) => {
			ev.preventDefault();
			callbackfn();
		});
	}
}