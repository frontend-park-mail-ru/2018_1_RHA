/* eslint-disable indent */
import Player from './player.js';
import bus from '../../bus.js';
import PLAYER_STATES from "../config/playerStates";

export default class BotPlayer extends Player {
	constructor(name, color) {
		super(name, color);

		this.listeners();
	}

	listeners() {
		bus.on('bot-move', dict => {
			const nextPLayer = dict.payload;
			if (nextPLayer.nextPlayer().name === this.name) {

			}
			switch (this.status) {
				case PLAYER_STATES.DEFAULT:

					this.status = PLAYER_STATES.READY;
					bus.emit('select-region', curRegion);
					break;
				case PLAYER_STATES.READY:
					if (!this.currentPlayer().isTheRegionOfPlayer(curRegion)) {
						return;
					}

					//если нажали на выделенный регион
					if (curRegion === this.activeRegion()) {
						this.status = PLAYER_STATES.DEFAULT;
					}

					bus.emit('change-selection',
						{
							active: this.activeRegion(),
							new: curRegion
						});
					break;
			}
		});
	}
}