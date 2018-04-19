import Hexagon from '../../graphics/hexagon.js';
import bus from '../../bus.js';

/**
 * Class representing game region
 */
export default class Region {
	/**
	 * Creates Region
	 * @param name
	 * @param owner
	 * @param canvas
	 * @param coordinate
	 */
	constructor(name, owner, canvas, coordinate) {
		this.name = name;
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.selected = false;
		this.area = null;
		this.allowedCoordinates = coordinate.allowedCoord;
		this.coordinate = coordinate;
		this.owner = owner;
		this.color = owner.color;
		this.gameData = {
			units: 100500
		};
		this.label = null;
		this.neighbour = null;
		this.init();
	}
	setColor(color) {
		this.area.setColor(color);
	}
	getColor() {
		console.log(this.area.getColor());
		return this.area.getColor();
	}

	/**
	 * Draws Region and sets it up
	 */
	init() {
		for (let i = 0; i < this.allowedCoordinates.length; ++i) {
			if (this.allowedCoordinates[i].allowed) {

				console.log(this.allowedCoordinates[i].name, ' ', this.allowedCoordinates[i].x);

				this.area = new Hexagon(
					this.allowedCoordinates[i].name,
					this.canvas, this.allowedCoordinates[i].x,
					this.allowedCoordinates[i].y,
					this.color,
					this.coordinate
				);

				this.neighbour = this.allowedCoordinates[i].neighbour;
				this.label = this.allowedCoordinates[i].name;
				this.allowedCoordinates[i].allowed = false;
				return;
			}
		}
	}
}