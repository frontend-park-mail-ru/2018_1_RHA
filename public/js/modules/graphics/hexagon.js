/* eslint-disable no-undef */

export default class Hexagon {
	constructor(ctx, xC, yC) {
		this.ctx = ctx;
		this.draw(xC, yC);
	}

	draw(xC, yC) {
		this.xp = [xC - 100, xC - 50, xC + 50, xC + 100, xC + 50, xC - 50, xC - 100];
		this.yp = [yC, yC + 86.6, yC + 86.6, yC, yC - 86.6, yC - 86.6, yC];
		this.ctx.beginPath();
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 1;
		this.ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.ctx.stroke();
		this.ctx.closePath();
	}
}