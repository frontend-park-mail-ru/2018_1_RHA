import Player from './player.js';
import PLAYER_STATES from '../config/playerStates.js';

export default class MainPlayer extends Player {
	constructor() {
		super();
		this.state = PLAYER_STATES;
	}
}