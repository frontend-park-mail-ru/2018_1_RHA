/* eslint-disable no-undef */
import Section from '../baseView.js';
import Hexagon from "../../../modules/graphics/hexagon.js";
import Circle from "../../../modules/graphics/circle.js";

export default class GameSection extends Section {
	constructor () {
		super();
		// this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		// this.wrapper.innerHTML = generateCanvas(
		// 	{
		// 		'width': screen.width,
		// 		'height':screen.height,
		// 		'id': 'game-canvas'
		// 	}
		// );
		// this.parent.appendChild(this.wrapper);
		// this.canvas = document.getElementById('game-canvas');
	}

	render() {
		// this.ctx = this.canvas.getContext('2d');
		// this.ctx.beginPath();
		// this.ctx.lineJoin = 'round';
		// this.ctx.lineWidth = 10;
		// this.ctx.moveTo(100,100);
		// this.ctx.lineTo(100,500);
		// this.ctx.lineTo(500,500);
		// this.ctx.lineTo(100,100);
		// let gradient = this.ctx.createLinearGradient(100,100,500,500);
		// gradient.addColorStop(0, 'black');
		// gradient.addColorStop(0.1, 'grey');
		// gradient.addColorStop(0.2, 'brown');
		// gradient.addColorStop(0.3, 'red');
		// gradient.addColorStop(0.4, 'green');
		// gradient.addColorStop(0.5, 'blue');
		// gradient.addColorStop(0.6, 'orange');
		// gradient.addColorStop(0.7, 'yellow');
		// gradient.addColorStop(0.8, 'grey');
		// gradient.addColorStop(1, 'white');
		// this.ctx.fillStyle = gradient;
		// this.ctx.stroke();
		// this.ctx.fill();
		// this.ctx.closePath();
		// this.setOnClick(this.ctx);
		this.wrapper.appendChild(new Circle(0, 0, this.canvas).draw());
		this.wrapper.appendChild(new Hexagon(0, 0, this.canvas).draw());
		return this.wrapper;
	}
	allowed() {
		// return User.isAuthorized();
		return true;
	}

	setOnClick(ctx) {
		this.canvas.addEventListener('click', (ev) => {
			if (ctx.isPointInPath(ev.x, ev.y)) {
				alert('!!!');
			}
		});
	}
}