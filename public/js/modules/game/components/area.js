import Kexagon from '../../graphics/kexagon.js';
import bus from '../../bus';

export default class Area {
	constructor(name, owner, canvas, coordinate, units) {
		this.name = name;
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.coordinate = coordinate;
		this.owner = owner;
		this.gameData = {
			units: units
		};
		this.color = owner.color;
		this.init();
	}

	init() {

		this.coordinate.R = this.canvas.height / 610 * this.coordinate.R;
		this.sx = this.coordinate.R * 3 / 2.0;
		this.sy = this.coordinate.R * Math.sqrt(3.0) / 2;
		this.xR = this.coordinate.I * this.sx;
		this.yR = this.coordinate.J * this.sy * 2 + this.coordinate.I % 2 * this.sy;
		this.dx = 300 * this.canvas.width / 1000;
		this.dy = this.coordinate.R * 1.5 * this.canvas.height / 610;
		this.x = this.canvas.width / 1000 * this.xR + this.dx;
		this.y = this.canvas.height / 610 * this.yR + this.dy;

		bus.on('resize-for-draw', () => {
			// this.coordinate.R = this.canvas.height / 610 * this.coordinate.R;
			this.sx = this.coordinate.R * 3 / 2.0;
			this.sy = this.coordinate.R * Math.sqrt(3.0) / 2;
			this.xR = this.coordinate.I * this.sx;
			this.yR = this.coordinate.J * this.sy * 2 + this.coordinate.I % 2 * this.sy;
			this.dx = 300 * this.canvas.width / 1000;
			this.dy = this.coordinate.R * 1.5 * this.canvas.height / 610;
			this.x = this.canvas.width / 1000 * this.xR + this.dx;
			this.y = this.canvas.height / 610 * this.yR + this.dy;
			bus.emit('new-x-y', {
				x: this.x,
				y: this.y,
				color: this.color
				// r: this.coordinate.R

			});
		});

		this.area = new Kexagon(
			this.name,
			this.canvas,
			this.x,
			this.y,
			this.coordinate.R,
			this.color
		);
	}
}


