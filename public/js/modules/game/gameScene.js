/* eslint-disable indent,no-case-declarations */
import inHex from './math/inHex.js';
import bus from '../bus.js';
import PLAYER_STATES from './config/playerStates.js';

export default class GameScene {
	constructor(canvas, players, regions, switcher) {
		this.canvas  = canvas;
		this.game_ctx = canvas.getContext('2d');
		this.players = players;
		this.regions = regions;
		this.switcher = switcher;
		this.setPlayersRegions();
	}


	//TODO: все циклы return'ящие что то, должны быть оформлены в таком виде
	//текущий игрок
	currentPlayer() {
		for (let i = 0; i < this.players.length; ++i) {
			// TODO проверить работает ли это условие
			if (this.players[i].status !== PLAYER_STATES.DISABLED ) {
				return this.players[i];
			}
		}
	}


	nextPlayer() {
		const curP = this.currentPlayer();
		for (let i = 0; i < this.players.length; ++i) {
			if (this.players[i] === curP) {
				i = (i + 1) % this.players.length;
				return this.players[i];
			}
		}
	}

	//возвращает регион, если такой существует
	isRegion(x, y) {
		for (let i = 0; i < this.regions.length; ++i) {
			if (inHex(x, y, this.regions[i].area.xp, this.regions[i].area.yp)) {
				return this.regions[i];
			}
		}
		return false;
	}


	isNeighbour(active, current) {
		for (let i = 0; i < active.neighbour.length; i++) {
			if (current.label === active.neighbour[i]) {
				return true;
			}
		}
		return false;
	}

	//выделенный регион
	activeRegion() {
		for (let i = 0; i < this.regions.length; ++i) {
			if (this.regions[i].selected === true) {
				return this.regions[i];
			}
		}
	}

	deactivatePlayers() {
		this.players.forEach(player => player.active = false);
	}

	setPlayersRegions() {
		for (let i = 0; i < this.players.length; i++ ) {
			this.players[i].addRegion(this.regions[i]);
		}
	}

	isElementOfChangeCanvas(x, y) {
		return !!inHex(x, y, this.switcher.arrX, this.switcher.arrY);
	}

	//подписываемся на события кликов мышки
	onListeners() {
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
					bus.emit('select-region', curRegion);
					break;
				case PLAYER_STATES.READY:
					if (!this.currentPlayer().isTheRegionOfPlayer(curRegion)) {
						return;
					}

					//если нажали на выделенный регион
					if (curRegion === this.activeRegion()) {
						curPlayer.status = PLAYER_STATES.DEFAULT;
					}

					bus.emit('change-selection',
						{
							active: this.activeRegion(),
							new: curRegion
						});
					break;
			}
		});

		bus.on('contextmenu', data => {

			const curPlayer = this.currentPlayer();
			const activeRegion = this.activeRegion();
			const coordinates = data.payload;
			if (curPlayer.status === PLAYER_STATES.DISABLED || curPlayer.status !== PLAYER_STATES.READY) {
				return;
			}
			const curRegion = this.isRegion(coordinates.x, coordinates.y);
			if (!curRegion) {
				return;
			}
			if (!curPlayer.isTheRegionOfPlayer(curRegion)) {
				if (this.isNeighbour(activeRegion, curRegion) === false) {
					return;
				}

				bus.emit('attack', {
					from: this.activeRegion(),
					to: curRegion
				});
			} else {
				//TODO move units
			}
		});

		bus.on('left-click-change', data => {
			const curPlayer = this.currentPlayer();
			const nextPlayer = this.nextPlayer();
			const coordinates = data.payload;
			//if (coordinates !== 'bot') {
				if (curPlayer.status === PLAYER_STATES.DISABLED) {
					return;
				}
				if (!this.isElementOfChangeCanvas(coordinates.x, coordinates.y)) {
					return;
				}
			//}
			bus.emit('change-move', {
				current: curPlayer,
				next: nextPlayer,
				switcher: this.switcher
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

		bus.on('bot-change-move', data => {
			bus.emit('change-move', {
				current: this.currentPlayer(),
				next: this.nextPlayer(),
				switcher: this.switcher
			});
		});

	}
}

//todo:: ходит только первый бот
//todo:: бот может сходить в молоко
//todo:: придумать как убирать соседей