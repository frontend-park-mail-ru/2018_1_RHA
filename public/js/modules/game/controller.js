
import bus from '../bus.js';

/**
 * Class representing set of game controls
 */
export default class Controller {
	/**
	 * Creates controllers
	 * @param game_canvas
	 * @param change_canvas
	 */
	constructor(game_canvas, change_canvas) {
		this.game_canvas = game_canvas;
		this.change_canvas = change_canvas;

		this.onclick = (event) => {
			bus.emit('left-click', {x: event.x, y: event.y});
		};
		this.mousemove = (event) => {
			bus.emit('mousemove', {x: event.x, y: event.y});
		};
		this.contextmenu = (event) => {
			event.preventDefault();
			bus.emit('contextmenu', {x: event.x, y: event.y});
		};
		this.clickcanvas = (event) => {
			bus.emit('left-click-change', {x: event.x - screen.width * 0.9, y: event.y});
		};
		this.mousemovecanvas = (event) => {
			bus.emit('mousemove-change', {x: event.x - screen.width * 0.9, y: event.y});
		};
		this.conkekstcanvas = (event) => {
			event.preventDefault();
			bus.emit('contextmenu-change', {x: event.x - screen.width * 0.9, y: event.y});
		};
	}

	/**
	 * Turns controls on
	 */
	start() {
		this.game_canvas.addEventListener('click', this.onclick);

		this.game_canvas.addEventListener('mousemove', this.mousemove);

		this.game_canvas.addEventListener('contextmenu', this.contextmenu);

		this.change_canvas.addEventListener('click', this.clickcanvas);

		this.change_canvas.addEventListener('mousemove', this.mousemovecanvas);

		this.change_canvas.addEventListener('contextmenu', this.conkekstcanvas);
	}

	/**
	 * Turn controls off
	 */
	stop() {
		this.game_canvas.removeEventListener('click', this.onclick);

		this.game_canvas.removeEventListener('mousemove', this.mousemove);

		this.game_canvas.removeEventListener('contextmenu', this.contextmenu);

		this.change_canvas.removeEventListener('click', this.clickcanvas);

		this.change_canvas.removeEventListener('mousemove', this.mousemovecanvas);

		this.change_canvas.removeEventListener('contextmenu', this.conkekstcanvas);
	}
}

