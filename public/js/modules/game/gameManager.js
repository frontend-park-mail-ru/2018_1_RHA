import {attackAnimation} from './animation/attack/attackAnimation.js';
import {animationOverlay} from './animation/animationOverlay.js';
import {moveAnimation} from './animation/move/moveAnimation.js';
import {renderScene} from './helperFuncs/renderScene.js';
import {battleCalc} from './helperFuncs/battleCalc.js';
import PLAYER_STATES from './config/playerStates.js';
import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';
import {timer} from './helperFuncs/timer.js';
import User from '../userModel.js';
import bus from '../bus.js';


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
		this.log = document.getElementById('log');
	}


	/**
	 * Starts game logic 8)
	 */
	start() {
		if (this.mode === 2) {
			this.timer = document.getElementById('timer1');
		} else {
			this.timer = document.getElementById('timer');
		}
		timer(this.timer);
		this.select_region = (data) => {
			const region = data.payload;
			region.selected = true;
			region.area.setStroke('red');
			//todo:: попробовать запускать последовательно
			renderScene(this.canvas, this.regions, this.img);
		};
		this.remove_selection = (data) => {
			const region = data.payload;
			region.selected = false;
			region.area.setStroke('white');
			renderScene(this.canvas, this.regions, this.img);
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
					from.owner.addRegion(to, from.owner);
					to.area.setStroke('white');
					renderScene(this.canvas, this.regions, this.img);
					if (from.owner.regions.length === 5) {
						bus.emit('FinishSingleResult', 'you win');
					}
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
		this.stop_controller = () => {
			this.controller.stop();
		};
		this.start_controller = () => {
			this.controller.start();
		};
		this.illum_cur_m = (data) => {
			this.regions.forEach(region => {
				region.area.setStroke('black');
			});
			renderScene(this.canvas, this.regions, this.img);
			const players = data.payload;
			const curPlayer = players[0];
			players[1].forEach(player => {
				const lamp = document.getElementById(player.name);
				lamp.style.backgroundColor = '#A00';
			});
			curPlayer.regions.forEach(region => {
				region.area.setStroke('white');
				renderScene(this.canvas, this.regions, this.img);
			});
			const lamp = document.getElementById(curPlayer.name);
			lamp.style.backgroundColor = '#FF0000';
		};
		this.hideTimer = () => {
			this.timer.hidden = true;
			bus.emit('stop-timer', {});
		};
		this.reloadTimer = () => {
			timer(this.timer);
			this.timer.hidden = false;
		};

		bus.on('remove-selection', this.remove_selection);
		bus.on('select-region', this.select_region);
		bus.on('change-move', this.change_move);
		bus.on('move-units', this.move_units);
		bus.on('illum-cur', this.illum_cur);
		bus.on('illum-cur-m', this.illum_cur_m);
		bus.on('attack', this.attack);
		bus.on('stop-controller', this.stop_controller);
		bus.on('start-controller', this.start_controller);

		bus.on('TurnInit$Request', (data) => {
			const payload = data.payload;
			if (payload.cycle === true) {
				bus.emit('update-units', {});
			}
			if (payload.user === User.getCurUser().username) {
				this.reloadTimer();
			} else {
				this.hideTimer();
			}
		});
	}


	/**
	 * destroys game logic ;)
	 */
	destroy() {
		this.timer = null;
		bus.off('remove-selection', this.remove_selection);
		bus.off('select-region', this.select_region);
		bus.off('change-move', this.change_move);
		bus.off('move-units', this.move_units);
		bus.off('illum-cur', this.illum_cur);
		bus.off('illum-cur-m', this.illum_cur_m);
		bus.off('attack', this.attack);
		bus.off('stop-controller', this.stop_controller);
	}
}