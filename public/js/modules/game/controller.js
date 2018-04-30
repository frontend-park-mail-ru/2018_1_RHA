
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
	constructor(game_canvas, changeBut) {
		this.game_canvas = game_canvas;
		this.changeBut = changeBut;
		// this.change_canvas = change_canvas;
		// this.change_canvas.getContext('2d').transform(1,0,0,1, screen.width*0.7, 0);

		this.onclick = (event) => {
			console.log(event.offsetX, ' ', event.offsetY);
			// console.log(event.offsetX * 1000 / this.game_canvas.width);
			bus.emit('left-click', {x: event.offsetX, y: event.offsetY});
		};

		this.mousemove = (event) => {
			bus.emit('mousemove', {x: event.offsetX, y: event.offsetY});
		};
		this.contextmenu = (event) => {
			event.preventDefault();
			bus.emit('contextmenu', {x: event.offsetX, y: event.offsetY});
		};
		this.clickChangeBut = (event) => {
			bus.emit('left-click-change', {});
		};
		// this.mousemovecanvas = (event) => {
		// 	bus.emit('mousemove-change', {x: event.x- screen.width * 0.8, y: event.y});
		// };
		// this.conkekstcanvas = (event) => {
		// 	event.preventDefault();
		// 	bus.emit('contextmenu-change', {x: event.x - screen.width * 0.8, y: event.y});
		// };
	}

	/**
	 * Turns controls on
	 */
	start() {
		this.game_canvas.addEventListener('click', this.onclick);

		this.game_canvas.addEventListener('mousemove', this.mousemove);

		this.game_canvas.addEventListener('contextmenu', this.contextmenu);

		this.changeBut.addEventListener('click', this.clickChangeBut);
		//
		// this.change_canvas.addEventListener('mousemove', this.mousemovecanvas);
		//
		// this.change_canvas.addEventListener('contextmenu', this.conkekstcanvas);
	}

	/**
	 * Turn controls off
	 */
	stop() {
		this.game_canvas.removeEventListener('click', this.onclick);

		this.game_canvas.removeEventListener('mousemove', this.mousemove);

		this.game_canvas.removeEventListener('contextmenu', this.contextmenu);

		this.changeBut.removeEventListener('click', this.clickChangeBut);
		//
		// this.change_canvas.removeEventListener('mousemove', this.mousemovecanvas);
		//
		// this.change_canvas.removeEventListener('contextmenu', this.conkekstcanvas);
	}
}

