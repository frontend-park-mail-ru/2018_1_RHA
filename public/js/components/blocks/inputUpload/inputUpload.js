import Block from '../block.js';
let generateUpload = require('./inputUpload.pug');

export default class InputUpload extends Block {
	constructor() {
		super();
		this.upload_wrapper = document.createElement('div');
		this.upload_wrapper.classList.add('file-upload');
		this.upload_wrapper.innerHTML = generateUpload();
		this.text_input = document.createElement('input');
		this.text_input.setAttribute('type', 'text');
		this.text_input.setAttribute('id', 'filename');
		this.text_input.classList.add('filename');
		this.text_input.setAttribute('disabled', '');
		this.upload_wrapper.appendChild(this.text_input);
	}
	render() {
		return this.upload_wrapper;
	}
}