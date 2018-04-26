import PLAYER_STATES from '../config/playerStates.js';

/**
 * Class representing generic game Player
 */
export default class Player {
	/**
	 * Creates player
	 * @param name
	 * @param color
	 */
	constructor(name, color) {
		this.score = 0;
		this.resources = 0;
		this.regions = [];
		this.status = PLAYER_STATES.DISABLED;
		this.color = color;
		this.name = name;
	}

	/**
	 * should be overriden
	 */
	init() {

	}

	/**
	 * Принадлежит ли данный регион игроку
	 * @param region
	 * @return {boolean}
	 */
	isTheRegionOfPlayer(region) {
		for (let i = 0; i < this.regions.length; ++i) {
			if (this.regions[i].name === region.name) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Gives the player new region
	 * @param newRegion
	 */
	addRegion(newRegion) {
		newRegion.area.setColor(this.color);
		newRegion.area.reColor(this.color);
		newRegion.owner = this;
		this.regions.push(newRegion);
	}

	/**
	 * deletes region
	 * @param reg
	 */
	delRegion(reg) {
		for (let i = 0; i < this.regions.length; ++i) {
			if (this.regions[i] === reg) {
				this.regions.splice(i,1);
			}
		}
		if (this.regions.length === 0) {
			this.status = PLAYER_STATES.LOSE;
		}
	}

	/**
	 * sets player's status
	 * @param status
	 */
	setStatus(status) {
		this.status = status;
	}
}