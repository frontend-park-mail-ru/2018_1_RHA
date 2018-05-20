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
		// let X = this.coordinate.R * 2 + this.coordinate.R * 2 * this.coordinate.I;
		// let Y = 0;
		// if (this.coordinate.J % 2 === 0) {
		// 	Y = this.coordinate.R * 2 * 0.866 + this.coordinate.J * this.coordinate.R * 0.866;
		// } else {
		// 	Y = this.coordinate.R * 0.866 + this.coordinate.J * this.coordinate.R;
		// }
		// PS получено опытным путем
		let sx = this.coordinate.R * 1.8;
		let sy = this.coordinate.R * 1.05;
		let x = this.coordinate.I * sx + 345;
		let y = this.coordinate.J * sy * 2 + this.coordinate.I % 2 * sy + this.coordinate.R * 1.5;

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


