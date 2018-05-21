import Player from './player.js';
import bus from '../../bus.js';

/**
 * Class representing web player
 */
export default class WebPlayer extends Player {
	/**
	 * creates web player
	 */
	constructor(name, color, canvas,  img) {
		super(name, color, canvas,  img);
		this.listeners();
	}

	listeners() {
		bus.on('ServerStep', data => {
			const move = data.payload;
		});
	}
}