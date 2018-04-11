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
			debugger;
			const nextPLayer = dict.payload;
			if (nextPLayer.nextPlayer().name !== this.name) {
				return;
			}

			const attackers = [];
			for (let i = 0; i < this.regions.length; i++) {
				if (this.regions[i].neighbour.length === 0) {
					continue;
				}
				attackers.add(this.regions[i]);
			}
			const attacker = getRandom(0, attackers.length);
			bus.emit('attack', {
				from: attackers[attacker],
				to: attackers[attacker].neighbour[getRandom(0, attackers[attacker].neighbour.length)]
			});
			setTimeout(bus.emit('change-move', 'bot'), 100);
		});
	}
}