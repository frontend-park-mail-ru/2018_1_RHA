import PLAYER_STATES from './playerStates.js';


export default class Player {
	constructor() {
		this.score = 0;
		this.resources = 0;
		this.regions = [];
		this.state = PLAYER_STATES.DEFAULT;
		this.active = false;
	}

	init() {

	}

	isTheRegionOfPlayer(region) {
		for (let i = 0; i < this.regions.length; ++i) {
			if (this.regions[i].name === region.name) {
				return true;
			}
		}
		return false;
	}

	addRegion(something) {
		this.regions.push(something);
	}

	setActive(bool) {
		this.active = bool;
	}



}