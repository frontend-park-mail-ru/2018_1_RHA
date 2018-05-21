import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';
import Region from './components/region.js';
import GameManager from './gameManager.js';
import Controller from './controller.js';
import GameScene from './gameScene.js';
import bus from '../bus.js';
import {GameModes} from './config/modes.js';
import Ws from '../ws.js';
import User from '../userModel.js';
import WebPlayer from './player/webPlayer.js';
import Help from './help/help';
import Area from './components/area.js';

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

		// if (Game.__instance) {
		// 	return Game.__instance;
		// }
		this.listeners = {};
		Game.__instance = this;

		this.mode = mode;
		this.game_canvas = game_canvas;
		this.coordinate = coordinate;
		this.game_ctx = this.game_canvas.getContext('2d');
		this.img = img;
		this.scene = null;
		this.controller = new Controller(this.game_canvas, changeBut, this.mode);
		if (this.mode === GameModes.singleplayer) {
			this.players = [
				new MainPlayer('A', 'rgba(0,255,127,0.4)', this.game_canvas, this.img),
				new BotPlayer('B', 'rgba(0,0,205,0.4)', this.game_canvas, this.img),
				new BotPlayer('C', 'rgba(255,69,0,0.4)', this.game_canvas, this.img),
				new BotPlayer('D', 'rgba(139,125,107,0.4)', this.game_canvas, this.img),
				new BotPlayer('E', 'rgba(255,165,0,0.4)', this.game_canvas, this.img)
			];
			this.regions = [];

			this.players.forEach((player, i, arr) => {
				this.regions.push(new Region(player.name, player,
					this.game_canvas, this.coordinate, (arr.length - i) * 1000));
			});
			this.players.forEach(player => {
				player.setAllRegtions(this.regions);
			});
			this.regions.forEach(temp => {
				temp.setGlobalRegions(this.regions);
			});

			this.scene = new GameScene(this.game_canvas, this.players, this.regions, this.mode);
			this.manager = new GameManager(this.controller, this.game_canvas, this.regions, this.img, this.mode);
			this.help = new Help();
		}
		else {
			this.Ws = new Ws();
			bus.on('connected', () => {
				this.Ws.send('JoinGame$Request', {});
				bus.on('InitGame$Request', (data) => {
					const initData = data.payload;
					// узнаем индекс локального игрока + создадим игроков
					let indexPlayer;
					this.players = [];
					this.regions = [];
					const username = User.getCurUser().username;
					initData.players.forEach((player, index) => {
						if (player === username) {
							indexPlayer = index + 1;
						}

					});

					const map = initData.map;

					// 💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩
					const Radius = 610 / (2 * map.length - 1);
					const player  = new MainPlayer(username, 'green', this.game_canvas, this.img);
					this.players.push(player);
					const webPlayer = new WebPlayer('web', 'red', this.game_canvas, this.img);
					this.players.push(webPlayer);
					map.forEach((row, rI) => {
						row.forEach((col, cI) => {
							if (col.owner === indexPlayer) {
								const region = new Area(username + String(rI), player, this.game_canvas, {
									I: rI,
									J: cI,
									R: Radius
								}, col.units);
								this.regions.push(region);
							} else if (col.owner === 0) {
								const region = new Area(String(col.owner) + String(rI) + String(cI) + String(rI), new BotPlayer('bot', 'blue', this.game_canvas, this.img), this.game_canvas, {
									I: rI,
									J: cI,
									R: Radius
								}, col.units);
								this.regions.push(region);
							} else {
								const region = new Area('web' + String(rI), webPlayer, this.game_canvas, {
									I: rI,
									J: cI,
									R: Radius
								}, col.units);
								this.regions.push(region);
							}
						});
					});
					this.players.forEach(player => {
						player.setAllRegtions(this.regions);
					});

					this.scene = new GameScene(this.game_canvas, this.players, this.regions, this.mode);
					this.manager = new GameManager(this.controller, this.game_canvas, this.regions, this.img, this.mode);
					this.start();
				});
			});
		}
	}

	/**
	 * Starts game
	 */
	start() {
		this.controller.start();
		this.scene.onListeners();
		this.manager.start();
		bus.emit('start-game', {});
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

/*
* JoinGame$Request
* InitGame$Request
* ClientTurn$Request
* lovim
* InitGame$Request
* FinishGame
* ServerTurn
 */