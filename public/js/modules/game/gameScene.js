/* eslint-disable indent,no-case-declarations,no-console */
import inHex from './math/inHex.js';
import bus from '../bus.js';
import PLAYER_STATES from './config/playerStates.js';
import {aboutRegion} from './helperFuncs/renderInfoAboutRegion.js';
import Ws from '../ws.js';
import {GameModes} from './config/modes.js';

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
		for (let i = 0; i < this.regions.length; ++i) {
			if (inHex(x, y, this.regions[i].area.xp, this.regions[i].area.yp)) {
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
		//todo шняга полная, надо переделать по-хорошему
		for (let i = 0; i < this.players.length; i++ ) {
			// this.players[i].addRegion(this.regions[i]);
			for (let j = 0; j < this.regions.length; ++j) {
				if (this.regions[j].owner === this.players[i]) {
					this.players[i].addRegion(this.regions[j]);
				}
			}
		}
	}



	/**
	 * подписываемся на события кликов мышки
	 */
	onListeners() {
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
				const coordinates = data.payload;
				const curRegion = this.isRegion(coordinates.x, coordinates.y);

				if (!curRegion) {
					return;
				}

				if (!this.players.isTheRegionOfPlayer(curRegion)) {
					return;
				}
				console.log('multy');

				aboutRegion(curRegion, this.about_region);

				switch (this.players.status) {
					case PLAYER_STATES.DEFAULT:
						this.players.status = PLAYER_STATES.READY;
						bus.emit('select-region', curRegion);
						break;

					case PLAYER_STATES.READY:
						const activeRegion = this.activeRegion();
						if (curRegion === activeRegion) {
							this.players.status = PLAYER_STATES.DEFAULT;
							bus.emit('remove-selection', curRegion);
						}
						else {
							//выводим информацию о регионе
							aboutRegion(curRegion, this.about_region);
							curRegion.gameData.units += activeRegion.gameData.units;
							activeRegion.gameData.units = 0;
							// bus.emit('move-units',
							// 	{
							// 		active: activeRegion,
							// 		new: curRegion
							// 	});
							bus.emit('remove-selection', this.activeRegion());
							bus.emit('select-region', curRegion);
						}
						break;
				}
			});

			bus.on('contextmenu', data => {
				const activeRegion = this.activeRegion();
				const coordinates = data.payload;
				if (this.players.status === PLAYER_STATES.DISABLED || this.players.status !== PLAYER_STATES.READY) {
					return;
				}

				const curRegion = this.isRegion(coordinates.x, coordinates.y);
				if (!curRegion) {
					return;
				}

				//если не является соседом, то выходим
				if (this.isNeighbour(activeRegion, curRegion) === false) {
					return;
				}

				new Ws().send('from-to', {
					from: this.activeRegion(),
					to: curRegion
				});
			});

			bus.on('left-click-change', () => {
				// new Ws().send('change-move', {});
				bus.on('ws-change-move-confirm', (data) => {
					//TODO получить следующего игрока
					console.log(data);
					bus.emit('change-move', {});
				});
			});

			bus.on('start-game', (data) => {
				//TODO получить текущего игрока и заэмитить его
				console.log(data);
				// bus.emit('illum-cur',{});
			});
		}
	}
}
