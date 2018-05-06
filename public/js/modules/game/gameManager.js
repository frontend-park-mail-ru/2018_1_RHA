import bus from '../bus.js';
import {attackAnimation} from './animation/attack/attackAnimation.js';
import {animationOverlay} from './animation/animationOverlay.js';
import {moveAnimation} from './animation/move/moveAnimation.js';
import {renderScene} from './helperFuncs/renderScene.js';
import {battleCalc} from './helperFuncs/battleCalc.js';
import PLAYER_STATES from './config/playerStates.js';
import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';
import {timer} from './helperFuncs/timer.js';


/**
 * Class representing game logic
 */
export default class GameManager {
	/**
	 * Creates logic =)
	 * @param controller
	 */
	constructor(controller, canvas, regions, img, mode) {
		this.mode = mode;
		this.controller = controller;
		this.regions = regions;
		this.canvas = canvas;
		this.img = img;
		this.timer = document.getElementById('timer');
		this.log = document.getElementById('log');
	}


	/**
	 * Starts game logic 8)
	 */
	start() {
		console.log('manager');
		timer(this.timer);
		this.select_region = (data) => {
			const region = data.payload;
			region.selected = true;
			region.area.setStroke('red');
			//todo:: попробовать запускать последовательно
			renderScene(this.canvas, this.regions, this.img);
		};
		this.change_selection = (data) => {
			const regions = data.payload;
			regions.active.selected = false;
			regions.new.selected = true;
			let setNewColor = new Promise((resolve, reject) => {
				resolve(regions.new.area.setStroke('red'));
			});
			let setActiveColor = new Promise((resolve, reject) => {
				resolve(regions.active.area.setStroke('white'));
			});
			setNewColor
				.then(
					() => {
						renderScene(this.canvas, this.regions, this.img);
					}
				);
			setActiveColor
				.then(
					() => {
						renderScene(this.canvas, this.regions, this.img);
					}
				);
		};
		this.attack = (data) => {
			animationOverlay(window.innerWidth / 2, this.canvas.height * 0.92);

			const regions = data.payload;
			const from = regions.from;
			const to = regions.to;

			attackAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);


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

			// this.log.innerHTML = '<p>Player ' + from.name + ' attacked ' + to.name + '</p>';
		};
		this.change_move = (dict) => {
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
		};
		this.illum_cur = (data) => {
			const curPlayer = data.payload;
			curPlayer.regions.forEach(region => {
				region.area.setStroke('white');
				renderScene(this.canvas, this.regions, this.img);
			});
		};
		this.move_units = (data) => {
			const regions = data.payload;
			regions.active.selected = false;
			regions.new.selected = true;
			regions.new.area.setStroke('red');
			renderScene(this.canvas, this.regions, this.img);
			regions.active.area.setStroke('white');
			moveAnimation(
				regions.new.area.xC, regions.new.area.yC,
				regions.active.area.xC, regions.active.area.yC
			);
			renderScene(this.canvas, this.regions, this.img);
		};

		bus.on('change-selection', this.change_selection);
		bus.on('select-region', this.select_region);
		bus.on('change-move', this.change_move);
		bus.on('move-units', this.move_units);
		bus.on('illum-cur', this.illum_cur);
		bus.on('attack', this.attack);
	}


	/**
	 * destroys game logic ;)
	 */
	destroy() {
		bus.off('change-selection', this.change_selection);
		bus.off('select-region', this.select_region);
		bus.off('change-move', this.change_move);
		bus.off('move-units', this.move_units);
		bus.off('illum-cur', this.illum_cur);
		bus.off('attack', this.attack);
	}
}