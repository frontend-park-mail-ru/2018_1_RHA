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
		this.regions.forEach( (obj) => {
			return obj.name === region.name;
		});
	}

	addRegion(something) {
		this.regions.push(something);
	}

	setActive(bool) {
		this.active = bool;
	}



}