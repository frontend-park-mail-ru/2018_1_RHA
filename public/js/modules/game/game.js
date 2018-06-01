import {setUsers} from './helperFuncs/setUsers.js';
import MainPlayer from './player/mainPlayer.js';
import BotPlayer from './player/botPlayer.js';
import WebPlayer from './player/webPlayer.js';
import {GameModes} from './config/modes.js';
import Region from './components/region.js';
import GameManager from './gameManager.js';
import {colors} from './config/colors.js';
import Controller from './controller.js';
import Loader from '../loader/loader.js';
import Area from './components/area.js';
import GameScene from './gameScene.js';
import User from '../userModel.js';
import Help from './help/help';
import bus from '../bus.js';
import Ws from '../ws.js';

let generateFinishMenu = require('../../components/views/multiplayerView/finishGameMenu.pug');

/**
 * Class representing game
 */
export default class Game {
	/**
	 *
	 * @param mode
	 * @param game_canvas
	 * @param coordinate
	 * @param changeBut
	 * @param img
	 * @param root
	 */
	constructor(mode, game_canvas, coordinate, changeBut, img, root) {
		this.listeners = {};

		this.mode = mode;
		this.game_canvas = game_canvas;
		this.coordinate = coordinate;
		this.game_ctx = this.game_canvas.getContext('2d');
		this.img = img;
		this.root = root;
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
			bus.on('close-game', () => {
				this.destroy();
			});
		}
		else {
			this.Ws = new Ws();
			bus.on('connected', () => {
				let players = 2;
				this.Ws.send({class: 'JoinGame', players: players});
				Loader.animateLoader();
				bus.on('InitGame$Request', (data) => {
					Loader.deleteLoader();
					const initData = data.payload;
					// узнаем индекс локального игрока + создадим игроков
					let indexPlayer;
					this.players = [];
					this.regions = [];
					const username = User.getCurUser().username;
					initData.players.forEach((player, index) => {
						if (player === username) {
							indexPlayer = index + 1;
							this.mainPlayer = new MainPlayer(player, colors[index+1], this.game_canvas, this.img);
							this.players.push(this.mainPlayer);
						} else {
							this.webPlayer = new WebPlayer(player, colors[index+1], this.game_canvas, this.img);
							this.players.push(this.webPlayer);}
					});

					const map = initData.map;
					//todo переделать радиус
					// 💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩
					const Radius = 610 / map.length / 2 * 0.95;
					map.forEach((row, rI) => {
						row.forEach((col, cI) => {
							if (col.owner === indexPlayer) {
								const region = new Area(
									username + String(rI),
									this.mainPlayer ,
									this.game_canvas,
									{
										I: cI,
										J: rI,
										R: Radius
									},
									col.units,
									col.type
								);
								this.regions.push(region);
							} else if (col.owner === 0) {
								const region = new Area(
									String(col.owner) + String(rI) + String(cI) + String(rI),
									new BotPlayer('bot', 'grey', this.game_canvas, this.img),
									this.game_canvas,
									{
										I: cI,
										J: rI,
										R: Radius
									},
									col.units,
									col.type
								);
								this.regions.push(region);
							} else {
								const region = new Area(
									'web' + String(rI),
									this.webPlayer,
									this.game_canvas,
									{
										I: cI,
										J: rI,
										R: Radius
									},
									col.units,
									col.type
								);
								this.regions.push(region);
							}
						});
					});


					this.players.forEach(player => {
						player.setAllRegtions(this.regions);
					});

					setUsers(initData.players);
					this.scene = new GameScene(this.game_canvas, this.players, this.regions, this.mode);
					this.manager = new GameManager(this.controller, this.game_canvas, this.regions, this.img, this.mode);
					this.start();
				});
				//---------//---------//---------//---------//---------//---------

				// bus.on('choosen-mode', () => {
				// 	this.root.getElementsByClassName('finish-game-wrapper')[0].remove();
				// 	this.joinGame(players);
				// });
			});

			bus.on('FinishGame', (data) => {
				const winnerNum = data.payload.player;
				let result = null;
				if (winnerNum === null) {
					result = 'Your opponent fell off';
				} else {
					// console.log('mazafaka', this.players[winnerNum]);
					if (this.players[winnerNum-1].name === User.getCurUser().username) {
						result = 'You win!';
					} else {
						result = 'You loose!';
					}
				}
				bus.emit('FinishGameResult', {result: result});
				this.destroy();
			});
		}
	}

	joinGame(players) {
		this.Ws.send({class: 'JoinGame', players: players});
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
					this.mainPlayer = new MainPlayer(player, colors[index+1], this.game_canvas, this.img);
					this.players.push(this.mainPlayer);
				}
				else {
					this.webPlayer = new WebPlayer(player, colors[index+1], this.game_canvas, this.img);
					this.players.push(this.webPlayer);
				}
			});

			const map = initData.map;
			//todo переделать радиус
			// 💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩
			const Radius = 610 / map.length / 2 * 0.95;
			map.forEach((row, rI) => {
				row.forEach((col, cI) => {
					if (col.owner === indexPlayer) {
						const region = new Area(
							username + String(rI),
							this.mainPlayer ,
							this.game_canvas,
							{
								I: cI,
								J: rI,
								R: Radius
							},
							col.units,
							col.type
						);
						this.regions.push(region);
					} else if (col.owner === 0) {
						const region = new Area(
							String(col.owner) + String(rI) + String(cI) + String(rI),
							new BotPlayer('bot', 'grey', this.game_canvas, this.img),
							this.game_canvas,
							{
								I: cI,
								J: rI,
								R: Radius
							},
							col.units,
							col.type
						);
						this.regions.push(region);
					} else {
						const region = new Area(
							'web' + String(rI),
							this.webPlayer,
							this.game_canvas,
							{
								I: cI,
								J: rI,
								R: Radius
							},
							col.units,
							col.type
						);
						this.regions.push(region);
					}
				});
			});


			this.players.forEach(player => {
				player.setAllRegtions(this.regions);
			});

			setUsers(initData.players);
			this.scene = new GameScene(this.game_canvas, this.players, this.regions, this.mode);
			this.manager = new GameManager(this.controller, this.game_canvas, this.regions, this.img, this.mode);
			this.start();
		});
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