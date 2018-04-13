import Figure from './figure.js';

/**
 * Class represents Switcher graphical element
 */
export default class Switcher extends Figure {
	/**
	 * Creates switcher
	 * @param a
	 * @param canvas
	 * @param x
	 * @param y
	 */
	constructor(a, canvas, x, y) {
		super();
		this.a = a;
		this.x = x;
		this.y = y;
		this.arrX = [this.x, this.x - this.a * 0.866, this.x - this.a * 0.866];
		this.arrY = [this.y, this.y + this.a / 2, this.y - this.a / 2];
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.draw();
	}

	/**
	 * draws switcher
	 */
	draw() {
		this.game_ctx.beginPath();
		this.game_ctx.moveTo(this.x, this.y);
		this.game_ctx.lineTo(this.x - this.a * 0.866, this.y + this.a / 2);
		this.game_ctx.lineTo(this.x - this.a * 0.866, this.y - this.a / 2);
		this.game_ctx.lineTo(this.x, this.y);
		this.game_ctx.lineJoin = 'round';
		this.game_ctx.lineWidth = 3;
		this.game_ctx.strokeStyle = 'black';
		this.game_ctx.stroke();
		this.game_ctx.fillStyle = '#C0C0C0';
		this.game_ctx.fill();
		this.game_ctx.closePath();
	}

	/**
	 * Redraws switcher
	 * @param color
	 */
	reDraw(color) {
		this.game_ctx.beginPath();
		this.game_ctx.moveTo(this.x, this.y);
		this.game_ctx.lineTo(this.x - this.a * 0.866, this.y + this.a / 2);
		this.game_ctx.lineTo(this.x - this.a * 0.866, this.y - this.a / 2);
		this.game_ctx.lineTo(this.x, this.y);
		this.game_ctx.lineJoin = 'round';
		this.game_ctx.lineWidth = 3;
		this.game_ctx.strokeStyle = 'black';
		this.game_ctx.stroke();
		this.game_ctx.fillStyle = color;
		this.game_ctx.fill();
		this.game_ctx.closePath();
	}
}