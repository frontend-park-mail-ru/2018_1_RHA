/* eslint-disable no-undef */
import Block from '../block.js';
let generateInput = require('./input.pug');
/** Class representing Input */
export default class Input extends Block {
	/**
     * Creates input
     * @param {object} data – contains type, value and placeholder
     */
	constructor(data, style) {
		super();


		this.status = true; //заглушка

		this.wrapper = document.createElement('div');
		this.wrapper.classList.add(style);
		//TODO здесь надо указать все типы инпутов, которым не нужна лампа

		let CLASS = 'input';
		if (data.type === 'submit') {
			CLASS = 'button';
		}
		this.wrapper.innerHTML += generateInput({
			type: data.type,
			placeholder: data.placeholder,
			value: data.value,
			id: data.id,
			error_id: data.id.concat('_error'),
			CLASS: CLASS
		});
		this.error_id = data.id.concat('_error');
		this.ErrorElement = this.wrapper.getElementsByTagName('div')[1];
		this.InputElement = this.wrapper.getElementsByTagName('input')[0];
	}

	/**
     * Returns input DOM element
     * @return {HTMLDivElement | *}
     */
	render() {
		return this.wrapper;
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
			// this.ErrorElement.removeAttribute('hidden');
			document.getElementById(this.error_id).removeAttribute('hidden');
			this.InputElement.classList.add('input__error');
		} else {
			this.status = true;
			// this.ErrorElement.setAttribute('hidden', true);
			document.getElementById(this.error_id).setAttribute('hidden', 'true');
			this.InputElement.classList.remove('input__error');
		}
	}

	/**
     * Defines behaviour on change
     * @param {function} callbackfn – input data change handler
     */
	setOnInputChange(callbackfn) {
		this.InputElement.addEventListener('change', (event) => {
			event.preventDefault();
			callbackfn();
		});
	}
}