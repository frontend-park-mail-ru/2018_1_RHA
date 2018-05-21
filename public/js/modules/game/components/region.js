/* eslint-disable no-undef */
import Hexagon from '../../graphics/hexagon.js';
import {reachMatrix} from '../config/reach.js';
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
	constructor(name, owner, canvas, coordinate, units) {
		this.name = name;
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.selected = false;
		this.allowedCoordinates = coordinate.allowedCoord;
		this.coordinate = coordinate;
		this.owner = owner;
		this.color = owner.color;
		this.gameData = {
			units: units
		};
		this.setBusListeners();
		this.area = null;
		this.label = null;
		this.globalRegions = null;
		this.neighbour = null;
		this.number = null;
		this.init();
	}

	setColor(color) {
		this.area.setColor(color);
	}

	getColor() {
		return this.area.getColor();
	}

	setGlobalRegions(regions) {
		this.globalRegions = regions;
	}

	renderHex() {
		this.area.draw();
	}

	/**
	 * Draws Region and sets it up
	 */
	init() {
		for (let i = 0; i < this.allowedCoordinates.length; ++i) {
			if (this.allowedCoordinates[i].allowed) {
				this.area = new Hexagon(
					this.allowedCoordinates[i].name,
					this.canvas, this.allowedCoordinates[i].x,
					this.allowedCoordinates[i].y,
					this.color,
					this.coordinate
				);
				this.number = i;
				this.neighbour = this.allowedCoordinates[i].neighbour;
				this.label = this.allowedCoordinates[i].name;
				this.allowedCoordinates[i].allowed = false;
				return;
			}
		}
	}

	setNeighbours(num) {
		reachMatrix[num].forEach(temp => {
			if (temp === 1) {
				this.neighbour.push(temp + 1);
			}
		});
	}

	setBusListeners() {
		bus.on('update-neighbour', dict => {
			const data = dict.payload;
			//debugger;
			if (data.from.name === this.name) {
				this.removeNeighbour(data.to.name);
			} else if(data.to.name === this.name) {

				data.from.owner.regions.forEach(temp => {
					this.removeNeighbour(temp.name);
				});
				data.to.owner.regions.forEach(temp => {

					if (reachMatrix[data.to.number][temp.number] === 1) {
						let f = false;
						for (let i = 0; i < data.to.neighbour.length; ++i) {
							if (data.to.neighbour[i] === temp.name)  {
								f = true;
							}
						}
						if (f === false) {
							data.to.neighbour.push(temp.name);
						}
					}
				});

			} else {
				// debugger;
				this.globalRegions.forEach(region => {
					if (region.name === data.to.name) {
						if (reachMatrix[this.number][region.number] === 1) {
							let f = false;
							for (let i = 0; i < this.neighbour.length; ++i) {
								if (this.neighbour[i] === data.to.name) {
									f = true;
								}
							}
							if (f === false) {
								this.neighbour.push(data.to.name);
							}
							return;
						}
					}
				});
			}
		});

		bus.on('change-move', data => {
			//todo какое то будущее, прослушал все((
			this.gameData.units += 1000;
		});
	}

	removeNeighbour(name) {
		this.neighbour.forEach((cur, i) => {
			if (cur === name) {
				this.neighbour.splice(i, 1);
			}
		});
	}
}