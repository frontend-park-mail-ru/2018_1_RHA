/* eslint-disable no-undef */
import Section from '../baseView.js';
import Hexagon from "../../../modules/graphics/hexagon.js";
import inPoly from "../../../modules/game/core/core.js";

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
		this.canvas.addEventListener('click', event => {
			if (inPoly(event.x, event.y)) {
				alert('kaka');
			}
		});
		this.ctx = this.canvas.getContext('2d');
		new Hexagon(this.ctx).draw();
		return this.wrapper;
	}
	allowed() {
		// return User.isAuthorized();
		return true;
	}
}