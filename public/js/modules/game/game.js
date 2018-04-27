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
	constructor(mode, game_canvas, coordinate, changeBut, img) {
		//let GameConstructor = null;

		//todo:: онлайн и оффлайн режимы
		this.mode = mode;
		this.game_canvas = game_canvas;
		this.coordinate = coordinate;
		this.game_ctx = this.game_canvas.getContext('2d');
		this.controller = new Controller(this.game_canvas, changeBut);
		this.img = img;
		this.players = [
			new MainPlayer('A', 'rgba(0,255,127,0.4)', this.game_canvas, this.img),
			new BotPlayer('B','rgba(0,0,205,0.4)', this.game_canvas, this.img),
			new BotPlayer('C', 'rgba(255,69,0,0.4)', this.game_canvas, this.img),
			new BotPlayer('D', 'rgba(139,125,107,0.4)', this.game_canvas, this.img),
			new BotPlayer('E', 'rgba(255,165,0,0.4)', this.game_canvas, this.img)
		];

		this.regions = [];
		this.players.forEach( (player, i, arr) => {
			this.regions.push(new Region(player.name, player,
				this.game_canvas, this.coordinate, (arr.length - i) * 1000));
		});


		this.regions.forEach(temp => {
			temp.setGlobalRegions(this.regions);
		});

		this.scene = new GameScene(this.game_canvas, this.players, this.regions);
		this.manager = new GameManager(this.controller, this.game_canvas, this.regions, this.img);
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

//todo ИНТЕРФЕЙС БЛ*ТЬ
//todo при выделении границы говнятся, потому что не стираются старые
