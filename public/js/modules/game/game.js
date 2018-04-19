import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';
import Region from './components/region.js';
import GameManager from './gameManager.js';
import Controller from './controller.js';
import GameScene from './gameScene.js';

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
	constructor(mode, game_canvas, coordinate) {
		//let GameConstructor = null;

		//todo:: онлайн и оффлайн режимы
		this.mode = mode;
		this.game_canvas = game_canvas;
		this.coordinate = coordinate;
		this.game_ctx = this.game_canvas.getContext('2d');
		this.controller = new Controller(this.game_canvas);
		this.players = [
			new MainPlayer('first', 'green'),
			new BotPlayer('second','blue'),
		];
		this.third = new BotPlayer('third', 'crimson');
		this.forth = new BotPlayer('forth', 'silver');
		this.admin = new BotPlayer('admin', 'pink');

		this.regions = [];
		this.players.forEach( (player) => {
			this.regions.push(new Region(player.name + '_area', player,
				this.game_canvas, this.coordinate));
		});

		//раздал вручную
		this.regions.push(new Region(this.third.name + '_area', this.third,
			this.game_canvas, this.coordinate));
		this.regions.push(new Region(this.forth.name + '_area', this.forth,
			this.game_canvas, this.coordinate));

		this.regions.push(new Region(this.admin.name + '_area', this.admin,
			this.game_canvas, this.coordinate));


		this.scene = new GameScene(this.game_canvas, this.players, this.regions);
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