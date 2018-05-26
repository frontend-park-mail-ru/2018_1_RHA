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

		this.currentPart = 0;

		this.help = document.createElement('div');
		this.help.innerHTML += generateHelp();
		this.help.getElementsByClassName('div__close')[0].addEventListener('click', () => { this.close(); });
	}

	render() {
		return this.help;
	}

	open() {
		bus.emit('open-help');
		this.help.setAttribute('hidden', 'false');
	}

	close() {
		bus.emit('close-help');
		this.help.setAttribute('hidden', 'true');
	}

	//переключение текста
	switch() {
		document.getElementById(this.parts[this.currentPart]).setAttribute('hidden', 'true');
		this.currentPart ++;
		document.getElementById(this.parts[this.currentPart]).setAttribute('hidden', 'false');
	}
}