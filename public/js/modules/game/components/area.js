import Kexagon from '../../graphics/kexagon.js';
import bus from '../../bus.js';

export default class Area {
	constructor(name, owner, canvas, coordinate, units, type) {
		this.name = name;
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.coordinate = coordinate;
		this.owner = owner;
		this.gameData = {
			units: units
		};
		if (type === 0) {
			this.color = 'blue';
		} else {
			this.color = owner.color;
		}
		this.area = null;
		this.type = type;
		// this.coordinate.R = this.canvas.height / 610 * this.coordinate.R;
		this.init();
		this.setBusListeners();
	}
	renderHex() {
		this.area.draw();
	}

	setColor(color) {
		this.color = color;
		this.area.setColor(color);
	}

	getColor() {
		return this.area.getColor();
	}

	setGlobalRegions(regions) {
		this.globalRegions = regions;
	}

	init() {
		this.sx = this.coordinate.R * 3 / 2.0;
		this.sy = this.coordinate.R * Math.sqrt(3.0) / 2;
		this.xR = this.coordinate.I * this.sx;
		this.yR = this.coordinate.J * this.sy * 2 + this.coordinate.I % 2 * this.sy;
		this.dx = 300 * this.canvas.width / 1000;
		this.dy = this.coordinate.R * 1.5 * this.canvas.height / 610;
		this.x = this.canvas.width / 1000 * this.xR + this.dx;
		this.y = this.canvas.height / 610 * this.yR + this.dy;

		// this.background = new AreaType(this.type, this.x, this.y, this.coordinate.R);

		this.area = new Kexagon(
			this.name,
			this.canvas,
			this.x,
			this.y,
			this.coordinate.R,
			this.color,
			this.type,
			this.gameData.units
		);
	}

	resize() {
		this.dx = 0;
		this.dy = 0;
		this.dx = 300 * this.canvas.width / 1000;
		this.dy = this.coordinate.R * 1.5 * this.canvas.height / 610;
		this.x = this.canvas.width / 1000 * this.xR + this.dx;
		this.y = this.canvas.height / 610 * this.yR + this.dy;
		// bus.emit('new-x-y', {
		// 	x: this.x,
		// 	y: this.y,
		// 	color: this.color
		// 	// r: this.coordinate.R
		// });
		this.area.xC = this.x;
		this.area.yC = this.y;
		this.area.color = this.color;
		this.renderHex();
	}

	setBusListeners() {
		bus.on('resize-for-draw-m', this.resize.bind(this));
	}
}


