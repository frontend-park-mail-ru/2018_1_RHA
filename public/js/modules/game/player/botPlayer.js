/* eslint-disable indent */
import Player from './player.js';
import bus from '../../bus.js';
import getRandom from '../math/getRandom.js';

export default class BotPlayer extends Player {
	constructor(name, color) {
		super(name, color);

		this.listeners();
	}

	listeners() {
		bus.on('bot-move', dict => {
			const nextPLayer = dict.payload;
			if (nextPLayer.name !== this.name) {
				return;
			}

			const attackers = [];
			for (let i = 0; i < this.regions.length; i++) {
				if (this.regions[i].neighbour.length === 0) {
					continue;
				}
				attackers.push(this.regions[i]);
			}
			const attacker = getRandom(0, attackers.length);
			// debugger;
			bus.emit('bot-attack', {
				from: attackers[attacker],
				to: attackers[attacker].neighbour[getRandom(0, attackers[attacker].neighbour.length)]
			});
			bus.emit('bot-change-move', 'bot');
		});
	}
}