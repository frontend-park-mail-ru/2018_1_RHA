import bus from '../bus.js';
import PLAYER_STATES from './config/playerStates.js';
import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';
import {timer} from './helperFuncs/timer.js';
import {battleCalc} from './helperFuncs/battleCalc.js';
import {renderScene} from './helperFuncs/renderScene.js';


/**
 * Class representing game logic
 */
export default class GameManager {
	/**
	 * Creates logic =)
	 * @param controller
	 */
	constructor(controller, canvas, regions, img) {
		this.controller = controller;
		this.game_canvas = canvas;
		this.regions = regions;
		this.img = img;
		this.timer = document.getElementById('timer');
		timer(this.timer);
	}


	/**
	 * Starts game logic 8)
	 */
	start() {
		bus.on('select-region', data => {
			const region = data.payload;
			region.selected = true;
			region.area.setStroke('red');
			renderScene(this.game_canvas, this.regions, this.img);
			// region.area.reDraw('red', 2);
		});

		bus.on('change-selection', data => {
			const regions = data.payload;
			regions.active.selected = false;
			regions.new.selected = true;
			// regions.new.area.reDraw('red', 2);
			regions.new.area.setStroke('red');
			// regions.active.area.reDraw('black', 2);
			regions.active.area.setStroke('black');

		});

		bus.on('attack', data => {
			const regions = data.payload;
			const from = regions.from;
			const to = regions.to;


			//true если первый, false если второй
			const fromWin = battleCalc(from, to);

			if (fromWin) {
				to.setColor(from.getColor());
				to.owner.delRegion(to);

				if (to.owner.regions.length === 0) {
					to.owner.setStatus(PLAYER_STATES.DISABLED);
					bus.emit('delete-from-queue', to.owner);

				}
				bus.emit('update-neighbour', {
					from: from,
					to: to
				});
				from.owner.addRegion(to);
			}
		});
		bus.on('change-move', (dict) => {
			const data = dict.payload;
			//data.switcher.reDraw('red');
			data.current.setStatus(PLAYER_STATES.DISABLED);
			data.next.setStatus(PLAYER_STATES.DEFAULT);
			if (data.next instanceof MainPlayer) {
				//вызываем таймер заного для текущего игрока
				timer(this.timer);
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


	/**
	 * destroys game logic ;)
	 */
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