import Block from '../blocks/block.js';

/** Class representing generic form */
export default class Form extends Block {
	/**
     * Create a form
     */
	constructor() {
		super();
		this.formElement = document.createElement('form');
	}

	/**
     * should be overriden
     */
	render() {

	}

	/**
     * to reset form data
     */
	reset() {
		this.formElement.reset();
	}

	/**
     * should be overriden
     */
	setOnSubmit() {
	}

	getStatus() {

	}

	//TODO после сабмита пробежишься по всем инпутам и проверяешь их стейты
	//TODO если что-то не так, то тогда от компоненты вызываешь setError, который должен разхидить errorElement
}