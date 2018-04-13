import Controller from './controller.js';
import GameScene from './gameScene.js';
import GameManager from './gameManager.js';
import Player from './player/player.js';
import Region from './components/region.js';
import allowedCoordinates from './config/allowedCoordinates.js';
import Switcher from '../graphics/switcher.js';
import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';

/**
 * Class representing game
 */
export default class Game {
	/**
	 * Creates game
	 * @param mode
	 * @param game_canvas
	 * @param change_canvas
	 */
	constructor(mode, game_canvas, change_canvas) {
		//let GameConstructor = null;

		//todo:: онлайн и оффлайн режимы
		this.mode = mode;
		this.game_canvas = game_canvas;
		this.change_canvas = change_canvas;
		this.game_ctx = this.game_canvas.getContext('2d');
		this.change_ctx = this.change_canvas.getContext('2d');
		this.controller = new Controller(this.game_canvas, this.change_canvas);
		this.players = [
			new MainPlayer('first', 'green'),
			new BotPlayer('second','blue'),
			new BotPlayer('third', 'crimson'),
			new BotPlayer('forth', 'silver'),
			new BotPlayer('admin', 'pink'),
		];
		this.regions = [];
		this.players.forEach( (player) => {
			this.regions.push(new Region(player.name + '_area', player,
				this.game_ctx, allowedCoordinates));
		});


		this.switcher = new Switcher(70, this.change_canvas, 100, 360);
		this.scene = new GameScene(this.game_canvas, this.players, this.regions, this.switcher);
		this.manager = new GameManager(this.controller);
	}

	/**
	 * Starts game
	 */
	start() {
		this.controller.start();
		this.scene.onListeners();
		this.manager.start();
	}

	/**
	 * turns game off
	 */
	destroy() {
		this.controller.stop();
		this.manager.destroy();
	}
}