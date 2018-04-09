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
		this.R = 100;
		this.dR = this.R * 0.866;
		this.xp = [xC - this.R, xC - this.R / 2, xC + this.R / 2, xC + this.R, xC + this.R / 2, xC - this.R / 2, xC - this.R];
		this.yp = [yC, yC + this.dR, yC + this.dR, yC, yC - this.dR, yC - this.dR, yC];
		this.ctx.beginPath();
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 3;
		this.ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.ctx.strokeStyle = 'black';
		this.ctx.stroke();
		this.ctx.fillStyle = color;
		this.ctx.fill();
		this.ctx.closePath();
	}

	reDraw(color, width) {
		this.xp = [this.xC - this.R, this.xC - this.R / 2, this.xC + this.R / 2, this.xC + this.R, this.xC + this.R / 2, this.xC - this.R / 2, this.xC - this.R];
		this.yp = [this.yC, this.yC + this.dR, this.yC + this.dR, this.yC, this.yC - this.dR, this.yC - this.dR, this.yC];
		this.ctx.beginPath();
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = width;
		this.ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
		this.ctx.closePath();
	}
}