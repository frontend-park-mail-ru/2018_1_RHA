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
				this.regions.forEach(region => {
					if (region.coordinate.I === move.map[1].coords.x
						&& region.coordinate.J === move.map[1].coords.y) {
						to = region;
					}
					if (region.coordinate.I === move.map[2].coords.x
						&& region.coordinate.J === move.map[2].coords.y) {
						from = region;
					}
				});
				attackAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);
				if (to.owner === from.owner) {
					to.setColor(from.getColor());
					to.owner.delRegion(to);
					from.owner.addRegion(to, from.owner);
					to.area.setStroke('white');
					renderScene(this.canvas, this.regions, this.img);
				}
			}
		});
	}
}