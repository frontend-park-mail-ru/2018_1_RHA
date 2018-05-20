import Form from '../form.js';
import Input from '../../blocks/input/input.js';
import InputUpload from '../../blocks/inputUpload/inputUpload.js';

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
		// this.UploadInput = new Input({
		// 	type: 'file',
		// 	placeholder: '',
		// 	id: 'loadImageInput'
		// }, 'upload-input');
		this.UploadInput = new InputUpload();
		this.UploadSubmit = new Input({
			type: 'submit',
			value: 'Save picture',
			id: 'loadImageSubmit'
		}, 'upload-submit');

		this.formElement.appendChild(this.UploadInput.render());
		this.formElement.appendChild(this.UploadSubmit.render());

		this.formElement.setAttribute('enctype', 'multipart/form-data');
		this.formElement.setAttribute('name', 'form_loadFile');
		this.formElement.classList.add('load-form');
		return this.formElement;
	}

	setOnSubmit(callbackfn) {
		this.formElement.addEventListener('submit', (ev) => {
			ev.preventDefault();
			callbackfn();
		});
	}
}