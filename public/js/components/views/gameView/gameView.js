/* eslint-disable no-undef */
import Section from '../baseView.js';

export default class GameSection extends Section {
	constructor () {
		super();
		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.innerHTML = generateCanvas(
			{
				'width': screen.width,
				'height':screen.height
			}
		);
		this.parent.appendChild(this.wrapper);
		this.canvas = document.getElementById('game-canvas');
	}

	render() {
		this.ctx = this.canvas.getContext('2d');
		this.ctx.fillRect(25,25,100,100);
		this.ctx.clearRect(45,45,60,60);
		this.ctx.strokeRect(50,50,50,50);
		return this.wrapper;
	}
	allowed() {
		// return User.isAuthorized();
		return true;
	}
}