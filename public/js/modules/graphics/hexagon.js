/* eslint-disable no-undef */
export default class Hexagon {
	constructor(ctx, xC, yC, color) {
		this.game_ctx = ctx;
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
		this.game_ctx.beginPath();
		this.game_ctx.lineJoin = 'round';
		this.game_ctx.lineWidth = 1;
		this.game_ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.game_ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.game_ctx.strokeStyle = 'black';
		this.game_ctx.stroke();
		this.game_ctx.fillStyle = color;
		this.game_ctx.fill();
		this.game_ctx.closePath();
	}

	reDraw(color, width) {
		this.xp = [this.xC - this.R, this.xC - this.R / 2, this.xC + this.R / 2, this.xC + this.R, this.xC + this.R / 2, this.xC - this.R / 2, this.xC - this.R];
		this.yp = [this.yC, this.yC + this.dR, this.yC + this.dR, this.yC, this.yC - this.dR, this.yC - this.dR, this.yC];
		this.game_ctx.beginPath();
		this.game_ctx.lineJoin = 'round';
		this.game_ctx.lineWidth = width;
		this.game_ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.game_ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.game_ctx.strokeStyle = color;
		this.game_ctx.stroke();
		this.game_ctx.closePath();
	}

	reColor (color) {
		this.xp = [this.xC - this.R, this.xC - this.R / 2, this.xC + this.R / 2, this.xC + this.R, this.xC + this.R / 2, this.xC - this.R / 2, this.xC - this.R];
		this.yp = [this.yC, this.yC + this.dR, this.yC + this.dR, this.yC, this.yC - this.dR, this.yC - this.dR, this.yC];
		this.game_ctx.beginPath();
		this.game_ctx.lineJoin = 'round';
		this.game_ctx.lineWidth = 1;
		this.game_ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.game_ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.game_ctx.strokeStyle = 'black';
		this.game_ctx.stroke();
		this.game_ctx.fillStyle = color;
		this.game_ctx.fill();
		this.game_ctx.closePath();
	}
}