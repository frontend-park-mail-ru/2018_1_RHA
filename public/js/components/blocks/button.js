import Block from './block.js';
/** Class representing button */
export default class Button extends Block {
    /**
    * Create a button
    * @param {string} type   - type of the button
    * @param {string} value  - inner text
    * @param {string} parent - parent element
    */
	constructor(type, value, parent) {
		super();
		this.buttonWrapper = document.createElement('div');
		this.buttonElement = document.createElement('button');
		this.buttonElement.classList.add('btn-style');
		this.buttonElement.classList.add('button');
		this.buttonElement.innerHTML = value;
		this.buttonElement.type = type;

		if (parent) {
			parent.appendChild(this.buttonWrapper);
		}
		this.buttonWrapper.classList.add('page-button');

		this.buttonWrapper.appendChild(this.buttonElement);
	}

	/**
     * Get the button DOM element
     * @return {HTMLDivElement | *}
     */
	render() {
		return this.buttonWrapper;
	}

	/**
     * To make a button hidden
     */
	hide() {
		this.buttonWrapper.classList.add('hidden');
	}

	/**
     * To make button visible
     */
	show() {
		this.buttonWrapper.classList.remove('hidden');
	}

	/**
     * Defines behaviour on click
     * @param {function} callbackfn - button click handler
     */
	setOnClick(callbackfn) {
		this.buttonElement.addEventListener('click', (e) => {
			event.preventDefault();
			callbackfn();
		});
	}
}
