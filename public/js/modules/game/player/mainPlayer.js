import Player from './player.js';
import PLAYER_STATES from '../config/playerStates.js';

/**
 * Class representing client's player
 */
export default class MainPlayer extends Player {
	/**
	 * Creates main player
	 * @param name
	 * @param color
	 */
	constructor(name, color) {
		super(name, color);
		this.status = PLAYER_STATES.DEFAULT;
	}
}