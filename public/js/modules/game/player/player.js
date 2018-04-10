import PLAYER_STATES from '../config/playerStates.js';


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

	addRegion(newRegion) {
		newRegion.area.reColor(this.color);
		newRegion.owner = this;
		this.regions.push(newRegion);
	}

	delRegion(reg) {
		this.regions.remove(reg);
		if (this.regions.length === 0) {
			this.state = PLAYER_STATES.LOSE;
		}
	}

	setActive(bool) {
		this.active = bool;
	}

}