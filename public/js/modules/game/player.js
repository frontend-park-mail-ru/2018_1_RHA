import PLAYER_STATES from './playerStates.js';


export default class Player {
	constructor(name, color) {
		this.score = 0;
		this.resources = 0;
		this.regions = [];
		this.state = PLAYER_STATES.DISABLED;
		this.color = color;
		this.name = name;
	}

	init() {

	}

	//Принадлежит ли данный регион игроку
	isTheRegionOfPlayer(region) {
		for (let i = 0; i < this.regions.length; ++i) {
			if (this.regions[i].name === region.name) {
				return true;
			}
		}
		return false;
	}

	addRegion(something) {
		something.area.reColor(this.color);
		this.regions.push(something);
	}

	delRegion(reg) {
		this.regions.remove(reg);
		if (this.regions.length == 0) {
			console.log('player lose');
			this.state = PLAYER_STATES.LOSE;
		}
	}

	setActive(bool) {
		this.active = bool;
	}

}