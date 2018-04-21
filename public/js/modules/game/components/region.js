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
	constructor(name, owner, canvas, coordinate) {
		this.name = name;
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.selected = false;
		this.allowedCoordinates = coordinate.allowedCoord;
		this.coordinate = coordinate;
		this.owner = owner;
		this.color = owner.color;
		this.gameData = {
			units: 100500
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
			if (data.from.name === this.name) {
				this.removeNeighbour(data.to.name);
			} else if(data.to.name === this.name) {
				this.neighbour.forEach(temp => {
					this.globalRegions.forEach(global => {
						if (temp === global.name === data.from.name) {
							this.removeNeighbour(temp);
						}
					});
				});
			} else {
				this.globalRegions.forEach(region => {
					if (region.name === data.to.name) {
						if (reachMatrix[this.number][region.number] === 1) {
							this.neighbour.push(data.to.name);
							return;
						}
					}
				});
			}
		});
	}

	removeNeighbour(name) {
		this.neighbour = this.neighbour.map((cur) => {
			if (cur !== name) {
				return cur;
			}
		});
	}
}