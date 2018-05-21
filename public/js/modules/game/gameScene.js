/* eslint-disable indent,no-case-declarations,no-console */
import inHex from './math/inHex.js';
import bus from '../bus.js';
import PLAYER_STATES from './config/playerStates.js';
import {aboutRegion} from './helperFuncs/renderInfoAboutRegion.js';
import Ws from '../ws.js';
import {GameModes} from './config/modes.js';
import User from '../userModel.js';

/**
 * Class representing Game Scene (Set of graphical and logical elements)
 */
export default class GameScene {
	/**
	 * Creates scene
	 * @param canvas
	 * @param players
	 * @param regions
	 * @param switcher
	 * @param mode
	 */
	constructor(canvas, players, regions, mode) {
		this.mode = mode;
		this.canvas  = canvas;
		this.game_ctx = canvas.getContext('2d');
		this.players = players;
		this.regions = regions;
		this.about_region = document.getElementById('about-region');
		this.setPlayersRegions();
		if (mode === GameModes.multiplayer) {
			this.setPlayersStatus();
			this.curPlayer = null;
			this.ws = new Ws();
		}
	}

	/**
	 * Returns current player
	 * @return {*}
	 */
	currentPlayer() {
		for (let i = 0; i < this.players.length; ++i) {
			// TODO проверить работает ли это условие
			if (this.players[i].status !== PLAYER_STATES.DISABLED ) {
				return this.players[i];
			}
		}
	}

	/**
	 * Returns next player
	 * @return {*}
	 */
	nextPlayer() {
		const curP = this.currentPlayer();
		for (let i = 0; i < this.players.length; ++i) {
			if (this.players[i] === curP) {
				i = (i + 1) % this.players.length;
				return this.players[i];
			}
		}
	}

	/**
	 * Returns pointed region
	 * @param x
	 * @param y
	 * @return {Region | null}
	 */
	isRegion(x, y) {
		console.log('in isRegion:', x, '-', y);
		for (let i = 0; i < this.regions.length; ++i) {
			// console.log(this.regions[i].area.xp, '   ', this.regions[i].area.yp);
			// ------------------- что такое xp??????? ---------------------------
			if (inHex(x, y, this.regions[i].area.xp, this.regions[i].area.yp)) {
				console.log('got region ', this.regions[i].area);
				return this.regions[i];
			}
		}
		return null;
	}

	/**
	 *
	 * @param active
	 * @param current
	 * @return {boolean}
	 */
	isNeighbour(active, current) {
		for (let i = 0; i < active.neighbour.length; i++) {
			if (current.label === active.neighbour[i]) {
				return true;
			}
		}
		return false;
	}

	/**
	 *
	 * @return {Region}
	 */
	activeRegion() {
		for (let i = 0; i < this.regions.length; ++i) {
			if (this.regions[i].selected === true) {
				return this.regions[i];
			}
		}
	}

	/**
	 *
	 */
	deactivatePlayers() {
		this.players.forEach(player => player.active = false);
	}

	/**
	 * Sets regions for playes
	 */
	setPlayersRegions() {
		for (let i = 0; i < this.players.length; i++ ) {
			// this.players[i].addRegion(this.regions[i]);
			for (let j = 0; j < this.regions.length; ++j) {
				if (this.regions[j].owner === this.players[i]) {
					this.players[i].addRegion(this.regions[j]);
				}
			}
		}
	}

	setPlayersStatus() {
		bus.on('TurnInit$Request', data => {
			const user = data.payload.user;
			if (user === User.getCurUser().username) {
				this.players.forEach(player => {
					if (player.name === user) {
						player.setStatus(PLAYER_STATES.DEFAULT);
						this.curPlayer = player;
						bus.emit('start-controller', {});
					}
				});
			}
			else {
				this.players.forEach(player => {
					if (player.name === User.getCurUser().username) {
						bus.emit('stop-controller', {});
					}
				});
			}
		});
	}



	/**
	 * подписываемся на события кликов мышки
	 */
	onListeners() {
		console.log(this.mode);
		if (this.mode === GameModes.singleplayer) {
			bus.on('left-click', data => {
				const curPlayer = this.currentPlayer();
				const coordinates = data.payload;
				if (curPlayer.status === PLAYER_STATES.DISABLED) {
					return;
				}
				const curRegion = this.isRegion(coordinates.x, coordinates.y);
				if (!curRegion) {
					return;
				}
				switch (curPlayer.status) {
					case PLAYER_STATES.DEFAULT:
						if (!curPlayer.isTheRegionOfPlayer(curRegion)) {
							return;
						}
						curPlayer.status = PLAYER_STATES.READY;

						//выводим информацию о регионе
						aboutRegion(curRegion, this.about_region);
						bus.emit('select-region', curRegion);
						break;
					case PLAYER_STATES.READY:
						const activeRegion = this.activeRegion();
						if (!this.currentPlayer().isTheRegionOfPlayer(curRegion)) {
							console.log('attack');
							if (this.isNeighbour(activeRegion, curRegion) === false) {
								return;
							}
							bus.emit('attack', {
								from: activeRegion,
								to: curRegion
							});
						}
						//если нажали на выделенный регион
						else {
							if (curRegion === this.activeRegion()) {
								curPlayer.status = PLAYER_STATES.DEFAULT;
								bus.emit('remove-selection', curRegion);
							} else {
								//выводим информацию о регионе
								aboutRegion(curRegion, this.about_region);
								curRegion.gameData.units += activeRegion.gameData.units;
								activeRegion.gameData.units = 0;
								bus.emit('move-units',
									{
										active: this.activeRegion(),
										new: curRegion
									});
								bus.emit('remove-selection', this.activeRegion());
								bus.emit('select-region', curRegion);
							}
						}
						break;
				}
			});


			bus.on('left-click-change', () => {
				const curPlayer = this.currentPlayer();
				const nextPlayer = this.nextPlayer();
				if (curPlayer.status === PLAYER_STATES.DISABLED) {
					return;
				}
				bus.emit('change-move', {
					current: curPlayer,
					next: nextPlayer,
				});
			});

			bus.on('bot-attack', data => {
				const regs = data.payload;
				for (let i = 0; i < this.regions.length; ++i) {
					if (regs.to === this.regions[i].label) {
						bus.emit('attack', {
							from: regs.from,
							to: this.regions[i]
						});
					}
				}
			});

			bus.on('bot-change-move', () => {
				bus.emit('change-move', {
					current: this.currentPlayer(),
					next: this.nextPlayer(),
				});
			});

			bus.on('delete-from-queue', data => {
				const player = data.payload;
				// console.log(this.players, '  b ');
				this.players.forEach((cur, i) => {
					if (cur === player) {
						this.players.splice(i, 1);
					}
				});
				// console.log(this.players, ' a');
			});

			bus.on('start-game', () => {
				//подсветка текущего игрока
				bus.emit('illum-cur', this.currentPlayer());
			});
		}
		else {
			bus.on('left-click', data => {
				console.log('in game_scene');
				const coordinates = data.payload;
				const curRegion = this.isRegion(coordinates.x, coordinates.y);


				if (!curRegion) {
					return;
				}

				if (!this.curPlayer.isTheRegionOfPlayer(curRegion)) {
					return;
				}

				aboutRegion(curRegion, this.about_region);

				switch (this.curPlayer.status) {
					case PLAYER_STATES.DEFAULT:
						console.log('default m');
						this.curPlayer.status = PLAYER_STATES.READY;
						bus.emit('select-region', curRegion);
						break;

					case PLAYER_STATES.READY:
						console.log('ready m');
						const activeRegion = this.activeRegion();
						if (!this.curPlayer.isTheRegionOfPlayer(curRegion)) {
							console.log('attack');
							if (this.isNeighbour(activeRegion, curRegion) === false) {
								return;
							}
							this.ws.send('ClientStep', {
								from: [activeRegion.coordinate.I, activeRegion.coordinate.J],
								to: [curRegion.coordinate.I, curRegion.coordinate.J]
							});
						}
						//если нажали на выделенный регион
						else {
							if (curRegion === activeRegion) {
								this.curPlayer.status = PLAYER_STATES.DEFAULT;
								bus.emit('remove-selection', curRegion);
							}
							else {
								//выводим информацию о регионе
								aboutRegion(curRegion, this.about_region);
								bus.emit('remove-selection', this.activeRegion());
								bus.emit('select-region', curRegion);
							}
						}
						break;
				}
			});


			bus.on('left-click-change', () => {
				// new Ws().send('change-move', {});
				bus.on('ws-change-move-confirm', (data) => {
					//TODO получить следующего игрока
					console.log(data);
					bus.emit('change-move', {});
				});
			});

			bus.on('start-game', () => {
				//подсветка текущего игрока
				console.log(this.curPlayer);
				bus.emit('illum-cur', this.curPlayer);
			});
		}
	}
}

//todo вытащить текущего игркока
//todo отобрать контролы у неактивных игроков
//todo сделать ход
//todo почему то не срабатывает подписка на TurnInit$Request во второй раз ( в фукнции currentMpPlayer )