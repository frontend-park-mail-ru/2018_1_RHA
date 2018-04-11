import Player from './player.js';
import PLAYER_STATES from '../config/playerStates.js';

export default class MainPlayer extends Player {
	constructor(name, color) {
		super(name, color);
		this.status = PLAYER_STATES.DEFAULT;
	}
}