/* eslint-disable indent */
import Player from './player.js';
import bus from '../../bus.js';
import getRandom from '../math/getRandom.js';

/**
 * Class representing game Player
 */
export default class BotPlayer extends Player {
	/**
	 * Creates Player
	 * @param name
	 * @param color
	 */
	constructor(name, color, canvas,  img) {
		super(name, color, canvas,  img);

		this.listeners();
	}

	/**
	 * Sets up player's listeners
	 */
	listeners() {
		bus.on('bot-move', dict => {
			const nextPLayer = dict.payload;
			if (nextPLayer.name !== this.name) {
				return;
			}
			// debugger;
			const attackers = [];
			for (let i = 0; i < this.regions.length; i++) {

				if (this.regions[i].neighbour.length === 0) {
					continue;
				}
				attackers.push(this.regions[i]);
			}
			const attacker = getRandom(0, attackers.length - 1);
			// debugger;
			bus.emit('bot-attack', {
				from: attackers[attacker],
				to: attackers[attacker].neighbour[getRandom(0, attackers[attacker].neighbour.length - 1)]
			});
			bus.emit('bot-change-move', 'bot');
		});
	}
}