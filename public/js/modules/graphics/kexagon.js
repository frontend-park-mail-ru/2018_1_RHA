import bus from '../bus';

export default class Kexagon {
	constructor(name, canvas, x, y, r, color) {
		this.name = name;
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.xC = x;
		this.yC = y;
		this.R = r;
		this.color = color;
		this.strokeColor = 'black';
		// this.draw();
		bus.on('new-x-y', data => {
			const newCoord = data.payload;
			this.xC = newCoord.x;
			this.yC = newCoord.y;
			this.color = newCoord.color;
			this.draw();

		});
	}

	setColor(color) {
		this.color = color;
	}

	getColor() {
		return this.color;
	}

	setStroke(color) {
		this.strokeColor = color;
	}

	draw() {
		const amountofCoorX = 1000;
		const amountofCoorY = 610;
		this.dR = this.R * 0.866;
		this.xp = [
			this.xC - this.R * this.canvas.width / amountofCoorX,
			this.xC - this.R / 2 *  this.canvas.width / amountofCoorX,
			this.xC + this.R / 2 *  this.canvas.width / amountofCoorX,
			this.xC + this.R * this.canvas.width / amountofCoorX,
			this.xC + this.R / 2 * this.canvas.width / amountofCoorX,
			this.xC - this.R / 2 * this.canvas.width / amountofCoorX,
			this.xC - this.R * this.canvas.width / amountofCoorX
		];
		this.yp = [
			this.yC,
			this.yC + this.dR * this.canvas.height / amountofCoorY,
			this.yC + this.dR * this.canvas.height / amountofCoorY,
			this.yC,
			this.yC - this.dR * this.canvas.height / amountofCoorY,
			this.yC - this.dR *this.canvas.height / amountofCoorY,
			this.yC
		];
		this.game_ctx.beginPath();
		this.game_ctx.lineJoin = 'round';
		this.game_ctx.lineWidth = 4;
		this.game_ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.game_ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.game_ctx.strokeStyle = this.strokeColor;
		this.game_ctx.stroke();
		this.game_ctx.fillStyle = this.color;
		this.game_ctx.fill();
		this.game_ctx.closePath();
	}

	reColor () {
		const amountofCoorX = 1000;
		const amountofCoorY = 610;
		this.xp = [
			this.xC - this.R * this.canvas.width / amountofCoorX,
			this.xC - this.R / 2 *  this.canvas.width / amountofCoorX,
			this.xC + this.R / 2 *  this.canvas.width / amountofCoorX,
			this.xC + this.R * this.canvas.width / amountofCoorX,
			this.xC + this.R / 2 * this.canvas.width / amountofCoorX,
			this.xC - this.R / 2 * this.canvas.width / amountofCoorX,
			this.xC - this.R * this.canvas.width / amountofCoorX
		];
		this.yp = [
			this.yC,
			this.yC + this.dR * this.canvas.height / amountofCoorY,
			this.yC + this.dR * this.canvas.height / amountofCoorY,
			this.yC,
			this.yC - this.dR * this.canvas.height / amountofCoorY,
			this.yC - this.dR *this.canvas.height / amountofCoorY,
			this.yC
		];
		this.game_ctx.beginPath();
		this.game_ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.game_ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.game_ctx.strokeStyle = 'rgba(255,255,255,0.8)';
		this.game_ctx.stroke();
		this.game_ctx.closePath();
	}
}