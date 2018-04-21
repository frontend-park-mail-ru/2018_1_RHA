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
	constructor(mode, game_canvas, coordinate, changeBut) {
		//let GameConstructor = null;

		//todo:: онлайн и оффлайн режимы
		this.mode = mode;
		this.game_canvas = game_canvas;
		this.coordinate = coordinate;
		this.game_ctx = this.game_canvas.getContext('2d');
		this.controller = new Controller(this.game_canvas, changeBut);
		this.players = [
			new MainPlayer('A', 'green'),
			new BotPlayer('B','blue'),
			new BotPlayer('C', 'crimson'),
			new BotPlayer('D', 'silver'),
			new BotPlayer('E', 'yellow')
		];
		// this.third = new BotPlayer('C', 'crimson');
		// this.forth = new BotPlayer('D', 'silver');
		// this.admin = new BotPlayer('E', 'pink');

		this.regions = [];
		this.players.forEach( (player) => {
			this.regions.push(new Region(player.name, player,
				this.game_canvas, this.coordinate));
		});

		//раздал вручную
		// this.regions.push(new Region(this.third.name, this.third,
		// 	this.game_canvas, this.coordinate));
		// this.regions.push(new Region(this.forth.name, this.forth,
		// 	this.game_canvas, this.coordinate));
		//
		// this.regions.push(new Region(this.admin.name, this.admin,
		// 	this.game_canvas, this.coordinate));

		this.regions.forEach(temp => {
			temp.setGlobalRegions(this.regions);
		});

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

//todo ограничить действия (ввести юнитов (математика), таймер)
//todo при выделении границы говнятся, потому что не стираются старые
//todo ИНТЕРФЕЙС БЛ*ТЬ