import Player from './player.js';
import bus from '../../bus.js';
import MainPlayer from './mainPlayer';
import {renderScene} from '../helperFuncs/renderScene';
import {attackAnimation} from '../animation/attack/attackAnimation';

/**
 * Class representing web player
 */
export default class WebPlayer extends Player {
	/**
	 * creates web player
	 */
	constructor(name, color, canvas,  img) {
		super(name, color, canvas,  img);
		if (WebPlayer.__instance) {
			return WebPlayer.__instance;
		}
		MainPlayer.__instance = this;
		this.listeners();
	}

	listeners() {
		bus.on('ServerStep', data => {
			const move = data.payload;
			let from = null;
			let to = null;
			if (move.type === 'attack') {
				//если длина 3, значит захватили
				if (move.map.length === 3) {
					for (let i = 0; i < this.allRegions.length; ++i) {
						if (this.allRegions[i].coordinate.I === move.map[1].coords.x
							&& this.allRegions[i].coordinate.J === move.map[1].coords.y) {
							to = this.allRegions[i];
						}
						if (this.allRegions[i].coordinate.I === move.map[2].coords.x
							&& this.allRegions[i].coordinate.J === move.map[2].coords.y) {
							from = this.allRegions[i];
						}
					}
					to.setColor(from.getColor());
					console.log(from.getColor());
					to.owner.delRegion(to);
					from.owner.addRegionForWeb(to, from.owner, this.allRegions);
					to.area.setStroke('white');
					renderScene(this.canvas, this.allRegions, this.img);
				} else if (move.map.length === 2) {
					for (let i = 0; i < this.allRegions.length; ++i) {
						if (this.allRegions[i].coordinate.I === move.map[0].coords.x
							&& this.allRegions[i].coordinate.J === move.map[0].coords.y) {
							from = this.allRegions[i];
						}
						if (this.allRegions[i].coordinate.I === move.map[1].coords.x
							&& this.allRegions[i].coordinate.J === move.map[1].coords.y) {
							to = this.allRegions[i];
						}
					}
				}
				// attackAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);

			}

		});
	}
}