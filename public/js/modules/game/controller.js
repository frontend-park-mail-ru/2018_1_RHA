
import bus from '../bus.js';

export default class Controller {
	constructor(game_canvas, change_canvas) {
		this.game_canvas = game_canvas;
		this.change_canvas = change_canvas;
	}

	start() {
		this.game_canvas.addEventListener('click', event => {
			bus.emit('left-click', {x: event.x, y: event.y});
		});

		this.game_canvas.addEventListener('mousemove', event => {
			bus.emit('mousemove', {x: event.x, y: event.y});
		});

		this.game_canvas.addEventListener('contextmenu', event => {
			event.preventDefault();
			bus.emit('contextmenu', {x: event.x, y: event.y});
		});


		this.change_canvas.addEventListener('click', event => {
			bus.emit('left-click-change', {x: event.x - screen.width * 0.9, y: event.y});
		});

		this.change_canvas.addEventListener('mousemove', event => {
			bus.emit('mousemove-change', {x: event.x - screen.width * 0., y: event.y});
		});

		this.change_canvas.addEventListener('contextmenu', event => {
			event.preventDefault();
			bus.emit('contextmenu-change', {x: event.x - screen.width * 0., y: event.y});
		});
	}

	destroy() {
		this.game_canvas.removeEventListener('click', event => {
			bus.emit('left-click', {x: event.x, y: event.y});
		});

		this.game_canvas.removeEventListener('mousemove', event => {
			bus.emit('mousemove', {x: event.x, y: event.y});
		});
		this.game_canvas.removeEventListener('contextmenu', event => {
			event.preventDefault();
			bus.emit('contextmenu', {x: event.x, y: event.y});
		});


		this.change_canvas.removeEventListener('click', event => {
			bus.emit('left-click-change', {x: event.x - screen.width * 0., y: event.y});
		});

		this.change_canvas.removeEventListener('mousemove', event => {
			bus.emit('mousemove-change', {x: event.x - screen.width * 0., y: event.y});
		});
		this.change_canvas.removeEventListener('contextmenu', event => {
			event.preventDefault();
			bus.emit('contextmenu-change', {x: event.x - screen.width * 0., y: event.y});
		});
	}
}

