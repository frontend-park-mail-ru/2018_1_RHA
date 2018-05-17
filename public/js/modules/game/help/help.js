/* eslint-disable no-undef */

import bus from '../../bus.js';

let generateHelp = require('./help.pug');

export default class Help {
	constructor() {
		if (Help.__instance) {
			return Help.__instance;
		}
		this.listeners = {};
		Help.__instance = this;

		this.help = document.createElement('div');
		this.help.innerHTML += generateHelp();
		this.help.getElementsByClassName('div__close')[0].addEventListener('click', () => {
			bus.emit('close-help');
			this.help.setAttribute('hidden', 'true');
		});
	}

	render() {
		return this.help;
	}
}