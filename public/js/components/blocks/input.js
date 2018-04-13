import Block from './block.js';
/** Class representing Input */
export default class Input extends Block {
	/**
     * Creates input
     * @param {object} data – contains type, value and placeholder
     */
	constructor(data) {
		super();

		this.InputElement = document.createElement('input');
		this.InputElement.type = data.type;
		if(data.type === 'submit') {
			this.InputElement.value = data.value;
			this.InputElement.classList.add('button');
		}
		else {
			this.InputElement.placeholder = data.placeholder;
			this.InputElement.classList.add('input');
		}

		this.InputWrapper = document.createElement('div');
		this.InputWrapper.appendChild(this.InputElement);

		this.status = true; //заглушка

		this.ErrorElement = document.createElement('div');
		this.ErrorElement.classList.add('error');
		this.InputWrapper.appendChild(this.ErrorElement);

	}

	/**
     * Returns input DOM element
     * @return {HTMLDivElement | *}
     */
	render() {
		return this.InputWrapper;
	}

	/**
     * For validation process
     * @return {boolean} – true if valid
     */
	getState() {
		return this.status;
	}

	/**
     * Returns input data
     * @return {string}
     */
	getData() {
		return this.InputElement.value;
	}
	getFormData() {
		return this.InputElement;
	}

	/**
     * To set error message or unset error
     * @param {string} error
     */
	setError(error) {
		if (error) {
			this.status = false;
			this.ErrorElement.innerHTML = error;
			this.InputElement.classList.add('input__error');
		} else {
			this.status = true;
			this.ErrorElement.style.display = 'none';
			this.InputElement.classList.remove('input__error');
		}
	}


	//TODO: в качестве коллбека можешь передать методы валидатора, тогда ему будут видны поля этого класса
	/**
     * Defines behaviour on change
     * @param {function} callbackfn – input data change handler
     */
	setOnInputChange(callbackfn) {
		this.InputElement.addEventListener('change', (e) => {
			event.preventDefault();
			callbackfn();
		});
	}
}