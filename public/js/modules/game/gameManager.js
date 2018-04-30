import bus from '../bus.js';
import PLAYER_STATES from './config/playerStates.js';
import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';
import {timer} from './helperFuncs/timer.js';
import {battleCalc} from './helperFuncs/battleCalc.js';
import {renderScene} from './helperFuncs/renderScene.js';
import {animationOverlay} from './animation/animationOverlay.js';
import {attackAnimation} from './animation/attackAnimation.js';


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
		this.regions = regions;
		this.canvas = canvas;
		this.img = img;
		this.timer = document.getElementById('timer');
		this.log = document.getElementById('log');
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
			renderScene(this.canvas, this.regions, this.img);
		});

		bus.on('change-selection', data => {
			const regions = data.payload;
			regions.active.selected = false;
			regions.new.selected = true;
			regions.new.area.setStroke('red');
			renderScene(this.canvas, this.regions, this.img);
			regions.active.area.setStroke('white');
			renderScene(this.canvas, this.regions, this.img);
		});

		bus.on('attack', data => {
			animationOverlay(window.innerWidth / 2, this.canvas.height * 0.92);

			const regions = data.payload;
			const from = regions.from;
			const to = regions.to;

			attackAnimation(to.area.xC, to.area.yC);


			//true если первый, false если второй
			const fromWin = battleCalc(from, to);
			setTimeout(() => {

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
					to.area.setStroke('white');
					renderScene(this.canvas, this.regions, this.img);
				}
			}, 1000);

			this.log.innerHTML = '<p>Player ' + from.name + ' attacked ' + to.name + '</p>';
		});
		bus.on('change-move', (dict) => {
			this.regions.forEach(region => {
				region.area.setStroke('black');
			});
			const data = dict.payload;
			//data.switcher.reDraw('red');
			data.current.setStatus(PLAYER_STATES.DISABLED);
			data.next.setStatus(PLAYER_STATES.DEFAULT);
			if (data.next instanceof MainPlayer) {
				//вызываем таймер заного для текущего игрока

				data.next.regions.forEach(region => {
					region.area.setStroke('white');
					renderScene(this.canvas, this.regions, this.img);
				});
				timer(this.timer);
				this.controller.start();
			}
			else if (data.next instanceof BotPlayer) {
				data.next.regions.forEach(region => {
					region.area.setStroke('white');
					renderScene(this.canvas, this.regions, this.img);
				});
				this.controller.stop();
				bus.emit('bot-move', data.next);
			}
			else {
				this.controller.stop();
			}
		});
		bus.on('illum-cur', data => {
			const curPlayer = data.payload;
			curPlayer.regions.forEach(region => {
				region.area.setStroke('white');
				renderScene(this.canvas, this.regions, this.img);
			});
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