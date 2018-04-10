/* eslint-disable no-undef */
import Figure from './figure.js';

export default class Circle extends Figure {
	constructor(x, y, r, canvas) {
		super();
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.x = x;
		this.y = y;
		this.r = r;
		this.draw();
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.lineWidth = 3;
		this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		this.ctx.stroke();
		this.ctx.fillStyle = 'silver';
		this.ctx.fill();
		this.ctx.closePath();
		this.setOnClick();
	}

	setOnClick() {

	}
}