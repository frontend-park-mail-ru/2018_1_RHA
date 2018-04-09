
import bus from '../bus.js';

export default class Controller {
	constructor(canvas) {
		this.canvas = canvas;
	}

	start() {
		document.addEventListener('click', event => {
			bus.emit('left-click', {x: event.x, y: event.y});
		});

		document.addEventListener('mousemove', event => {
			bus.emit('mousemove', {x: event.x, y: event.y});
		});
		document.addEventListener('contextmenu', event => {
			bus.emit('contextmenu', {x: event.x, y: event.y});
		});
	}

	destroy() {
		document.removeEventListener('click', event => {
			bus.emit('left-click', {x: event.x, y: event.y});
		});

		document.removeEventListener('mousemove', event => {
			bus.emit('mousemove', {x: event.x, y: event.y});
		});
		document.removeEventListener('contextmenu', event => {
			bus.emit('contextmenu', {x: event.x, y: event.y});
		});
	}

}

