import Player from './player.js';
import PLAYER_STATES from './playerStates.js';

export default class MainPlayer extends Player {
	constructor() {
		super();
		this.state = PLAYER_STATES;
	}
}