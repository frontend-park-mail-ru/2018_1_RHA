import PLAYER_STATES from './playerStates.js';


export default class Player {
	constructor() {
		this.score = 0;
		this.resources = 0;
		this.regions = [];
		this.state = PLAYER_STATES.READY;
	}

	init() {

	}

	currentRegion() {
		//todo:: подписаться на нажатие на регион и сравнить с нашими
	}

	addRegion(something) {
		this.regions.add(something);
	}

	setActive(bool) {
		this.active = bool;
	}



}