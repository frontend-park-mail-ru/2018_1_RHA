import Player from './player.js';
import bus from '../../bus.js';
import MainPlayer from './mainPlayer';

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
		});
	}
}