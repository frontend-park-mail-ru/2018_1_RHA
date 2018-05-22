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
			const fFrom = move.map[1].coords;
			const fTo = move.map[2].coords;
			if (move.type === 'attack') {
				console.log('0');
				this.regions.forEach(region => {
					console.log(region.coordinate.I, '   ', region.coordinate.J);
					if (region.coordinate.I === fFrom.x
						&& region.coordinate.J === fFrom.y) {
						to = region;
						console.log('1');
					}
					if (region.coordinate.I === fTo.x
						&& region.coordinate.J === fTo.y) {
						from = region;
						console.log('2');
					}
				});
				console.log('3');
				// attackAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);
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