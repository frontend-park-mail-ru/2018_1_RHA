/* eslint-disable no-undef */
import Figure from './figure.js';

export default class Hexagon extends Figure {
	constructor() {
		super();
		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.innerHTML = generateCanvas(
			{
				'width': 500,
				'height':500,
				'id': 'hex'
			}
		);
		this.parent.appendChild(this.wrapper);
		this.canvas = document.getElementById('hex');
		this.ctx = this.canvas.getContext('2d');
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 10;
		this.ctx.moveTo(100,100);
		this.ctx.lineTo(100,500);
		this.ctx.lineTo(500,500);
		this.ctx.lineTo(100,100);
		this.ctx.stroke();
		this.ctx.closePath();
		this.setOnClick();
		return this.wrapper;
	}

	setOnClick() {
		this.canvas.addEventListener('click', (ev) => {
			if (this.ctx.isPointInPath(ev.x, ev.y)) {
				alert('1');
			}
		});
	}
}