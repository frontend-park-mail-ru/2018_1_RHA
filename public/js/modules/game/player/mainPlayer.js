import Player from './player.js';
import PLAYER_STATES from '../config/playerStates.js';
import bus from '../../bus.js';

/**
 * Class representing client's player
 */
export default class MainPlayer extends Player {
	/**
	 * Creates main player
	 * @param name
	 * @param color
	 */
	constructor(name, color, canvas,  img) {
		super(name, color, canvas, img);
		this.status = PLAYER_STATES.DEFAULT;
	}

	delRegion(reg) {
		for (let i = 0; i < this.regions.length; ++i) {
			if (this.regions[i] === reg) {
				this.regions.splice(i,1);
			}
		}
		if (this.regions.length === 0) {
			this.status = PLAYER_STATES.LOSE;
			bus.emit('gameover', {});
		}
	}
}