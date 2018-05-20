import Kexagon from '../../graphics/kexagon.js';

export default class Area {
	constructor(name, owner, canvas, coordinate, units) {
		this.name = name;
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.coordinate = coordinate;
		this.gameData = {
			units: units
		};
		this.color = owner.color;
		this.init();
	}

	init() {
		const sx = this.coordinate.R * 3 / 2.0;
		const sy = this.coordinate.R * 0.866;
		const x = this.coordinate.I * sx;
		const y = this.coordinate.J * sy * 2 + this.coordinate.I % 2 * sy;
		this.area = new Kexagon(
			this.name,
			this.canvas,
			x,
			y,
			this.coordinate.R,
			this.color
		);
	}
}