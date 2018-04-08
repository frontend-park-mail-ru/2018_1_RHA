/* eslint-disable no-undef */

export default class Hexagon {
	constructor(ctx) {
		this.ctx = ctx;
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
	}
}