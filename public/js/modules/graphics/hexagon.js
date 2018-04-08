/* eslint-disable no-undef */

export default class Hexagon {
	constructor(ctx, xC, yC, color) {
		this.ctx = ctx;
		this.draw(xC, yC, color);
		this.xC = xC;
		this.yC = yC;
		this.color = color;
	}

	draw(xC, yC, color) {
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
		this.ctx.fillStyle = color;
		this.ctx.fill();
		this.ctx.closePath();
	}
	reDraw(color) {
		this.xp = [this.xC - 100, this.xC - 50, this.xC + 50,
			this.xC + 100, this.xC + 50, this.xC - 50, this.xC - 100];

		this.yp = [this.yC, this.yC + 86.6, this.yC + 86.6,
			this.yC, this.yC - 86.6, this.yC - 86.6, this.yC];
		this.ctx.beginPath();
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 1;
		this.ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.ctx.fillStyle = color;
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.closePath();
	}
	reStore() {
		this.xp = [this.xC - 100, this.xC - 50, this.xC + 50,
			this.xC + 100, this.xC + 50, this.xC - 50, this.xC - 100];

		this.yp = [this.yC, this.yC + 86.6, this.yC + 86.6,
			this.yC, this.yC - 86.6, this.yC - 86.6, this.yC];
		this.ctx.beginPath();
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 1;
		this.ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.ctx.fillStyle = this.color;
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.closePath();
	}

}