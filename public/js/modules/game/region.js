import Hexagon from '../graphics/hexagon.js';


export default class Region {
	constructor(name, color, ctx, allowedCoordinates) {
		this.name = name;
		this.color = color;
		this.ctx = ctx;
		this.selected = false;
		this.area = null;
		this.allowedCoordinates = allowedCoordinates;
		this.init();
	}

	init() {
		for (let i = 0; i < this.allowedCoordinates.length; ++i) {
			if (this.allowedCoordinates[i].allowed) {
				this.area = new Hexagon(this.ctx, this.allowedCoordinates[i].x,
					this.allowedCoordinates[i].y, this.color);
				this.allowedCoordinates[i].allowed = false;
				return;
			}
		}
	}
}