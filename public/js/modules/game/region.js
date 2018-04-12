import Hexagon from '../graphics/hexagon.js';


export default class Region {
	constructor(name, owner, ctx, allowedCoordinates) {
		this.name = name;
		this.ctx = ctx;
		this.selected = false;
		this.area = null;
		this.allowedCoordinates = allowedCoordinates;
		this.owner = owner;
		this.color = owner.color;
		this.gameData = {
			units: 100500
		};
		this.label = null;
		this.neighbour = null;
		this.init();
	}

	init() {
		for (let i = 0; i < this.allowedCoordinates.length; ++i) {
			if (this.allowedCoordinates[i].allowed) {
				this.area = new Hexagon(this.ctx, this.allowedCoordinates[i].x,
					this.allowedCoordinates[i].y, this.color);
				this.allowedCoordinates[i].allowed = false;
				this.neighbour = this.allowedCoordinates[i].neighbour;
				this.label = this.allowedCoordinates[i].name;
				return;
			}
		}
	}
}