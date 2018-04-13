/* eslint-disable no-undef */
import Figure from './figure.js';

/**
 * Class represents Circle graphical element
 */
export default class Circle extends Figure {
	/**
	 * Creates Circle
	 * @param x
	 * @param y
	 * @param r
	 * @param canvas
	 */
	constructor(x, y, r, canvas) {
		super();
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.x = x;
		this.y = y;
		this.r = r;
		this.draw();
	}

	/**
	 * draws circle
	 */
	draw() {
		this.game_ctx.beginPath();
		this.game_ctx.lineWidth = 3;
		this.game_ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		this.game_ctx.stroke();
		this.game_ctx.fillStyle = 'silver';
		this.game_ctx.fill();
		this.game_ctx.closePath();
		this.setOnClick();
	}

	/**
	 *
	 */
	setOnClick() {

	}
}