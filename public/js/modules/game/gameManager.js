import bus from '../bus.js';
import PLAYER_STATES from './config/playerStates.js';
import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';


//todo: подписываемся на события связанные с действиями в игре
export default class GameManager {
	constructor(controller) {
		this.controller = controller;
	}

	start() {
		bus.on('select-region', data => {
			const region = data.payload;
			region.selected = true;
			region.area.reDraw('red', 2);
		});

		bus.on('change-selection', data => {
			console.log('aaa');
			const regions = data.payload;
			regions.active.selected = false;
			regions.new.selected = true;
			regions.new.area.reDraw('red', 2);
			regions.active.area.reDraw('black', 2);
		});

		bus.on('attack', data => {
			const regions = data.payload;
			const from = regions.from;
			const to = regions.to;
			const result = 1; //TODO математика вычисления победы или поражения
			if (result > 0) {
				//TODO у нас нет нормального способа узнать владельца региона
				to.owner.delRegion(to);
				from.owner.addRegion(to);
			}
		});

		bus.on('change-move', (dict) => {
			const data = dict.payload;
			data.switcher.reDraw('red');
			data.current.setStatus(PLAYER_STATES.DISABLED);
			data.next.setStatus(PLAYER_STATES.DEFAULT);
			if (data.next instanceof MainPlayer) {
				this.controller.start();
			}
			else if (data.next instanceof BotPlayer) {

				this.controller.stop();
				bus.emit('bot-move', data.next);
			}
			else {
				this.controller.stop();
			}
		});
	}

	destroy() {
		bus.off('select-region', data => {
			const region = data.payload;
			region.selected = true;
			region.area.reDraw('red', 3);
		});

		bus.off('change-selection', data => {
			const regions = data.payload;
			regions.active.selected = false;
			regions.new.selected = true;
			regions.new.area.reDraw('red', 3);
			regions.active.area.reDraw('black', 3);
		});
	}
}