/* eslint-disable no-undef */
import bus from '../bus.js';

/**
 * Class represents Hexagon graphical element
 */
export default class Hexagon {
	/**
	 * Creates Hexagon
	 * @param canvas
	 * @param xC
	 * @param yC
	 * @param color
	 */
	constructor(canvas, xC, yC, color) {
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.draw(xC, yC, color);
		this.xC = xC;
		this.yC = yC;
		this.color = color;
		bus.on('resize-for-draw', () => {
			//todo: Разобраться с цветом
			//todo: при обновлении страницы наезжают хексы
			//todo: далее с соседями
			this.draw(xC, yC, color);
		});
	}

	/**
	 * Draws graphical element
	 * @param xC
	 * @param yC
	 * @param color
	 */

	setColor(color) {
		this.color = color;
	}
	draw(xC, yC, color) {
		const amountofCoorX = 1000;
		const amountofCoorY = 610;
		this.R = 90;
		this.dR = this.R * 0.866;
		this.xp = [
			(xC - this.R) * this.canvas.width / amountofCoorX,
			(xC - this.R / 2) *  this.canvas.width / amountofCoorX,
			(xC + this.R / 2) *  this.canvas.width / amountofCoorX,
			(xC + this.R) * this.canvas.width / amountofCoorX,
			(xC + this.R / 2) * this.canvas.width / amountofCoorX,
			(xC - this.R / 2) * this.canvas.width / amountofCoorX,
			(xC - this.R) * this.canvas.width / amountofCoorX
		];
		this.yp = [
			yC *  this.canvas.height / amountofCoorY,
			(yC + this.dR) * this.canvas.height / amountofCoorY,
			(yC + this.dR) * this.canvas.height / amountofCoorY,
			yC * this.canvas.height / amountofCoorY,
			(yC - this.dR) * this.canvas.height / amountofCoorY,
			(yC - this.dR) *this.canvas.height / amountofCoorY,
			yC * this.canvas.height / amountofCoorY
		];
		this.game_ctx.beginPath();
		this.game_ctx.lineJoin = 'round';
		this.game_ctx.lineWidth = 2;
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

	/**
	 * Redraws hexagon
	 * @param color
	 * @param width
	 */
	reDraw(color, width) {
		const amountofCoorX = 1000;
		const amountofCoorY = 610;
		this.xp = [
			(this.xC - this.R) * this.canvas.width / amountofCoorX,
			(this.xC - this.R / 2) *  this.canvas.width / amountofCoorX,
			(this.xC + this.R / 2) *  this.canvas.width / amountofCoorX,
			(this.xC + this.R) * this.canvas.width / amountofCoorX,
			(this.xC + this.R / 2) * this.canvas.width / amountofCoorX,
			(this.xC - this.R / 2) * this.canvas.width / amountofCoorX,
			(this.xC - this.R) * this.canvas.width / amountofCoorX
		];
		this.yp = [
			this.yC *  this.canvas.height / amountofCoorY,
			(this.yC + this.dR) * this.canvas.height / amountofCoorY,
			(this.yC + this.dR) * this.canvas.height / amountofCoorY,
			this.yC * this.canvas.height / amountofCoorY,
			(this.yC - this.dR) * this.canvas.height / amountofCoorY,
			(this.yC - this.dR) *this.canvas.height / amountofCoorY,
			this.yC * this.canvas.height / amountofCoorY
		];
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

	/**
	 * Recolors hexagon
	 * @param color
	 */
	reColor (color) {
		const amountofCoorX = 1000;
		const amountofCoorY = 610;
		this.xp = [
			(this.xC - this.R) * this.canvas.width / amountofCoorX,
			(this.xC - this.R / 2) *  this.canvas.width / amountofCoorX,
			(this.xC + this.R / 2) *  this.canvas.width / amountofCoorX,
			(this.xC + this.R) * this.canvas.width / amountofCoorX,
			(this.xC + this.R / 2) * this.canvas.width / amountofCoorX,
			(this.xC - this.R / 2) * this.canvas.width / amountofCoorX,
			(this.xC - this.R) * this.canvas.width / amountofCoorX
		];
		this.yp = [
			this.yC *  this.canvas.height / amountofCoorY,
			(this.yC + this.dR) * this.canvas.height / amountofCoorY,
			(this.yC + this.dR) * this.canvas.height / amountofCoorY,
			this.yC * this.canvas.height / amountofCoorY,
			(this.yC - this.dR) * this.canvas.height / amountofCoorY,
			(this.yC - this.dR) *this.canvas.height / amountofCoorY,
			this.yC * this.canvas.height / amountofCoorY
		];
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