/**
 * Class represents generic graphical element
 */
export default class Figure {
	/**
	 * Creates figure
	 * @param ctx
	 * @param x
	 * @param y
	 */
	constructor(ctx, x , y) {
		this.game_ctx = ctx;
		this.x = x;
		this.y = y;
	}

	/**
	 * Should be overriden
	 */
	draw() {

	}
}