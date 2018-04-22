/* eslint-disable indent,no-case-declarations */
import inHex from './math/inHex.js';
import bus from '../bus.js';
import PLAYER_STATES from './config/playerStates.js';
import {aboutRegion} from './helperFuncs/renderInfoAboutRegion.js';

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
	 */
	constructor(canvas, players, regions) {
		this.canvas  = canvas;
		this.game_ctx = canvas.getContext('2d');
		this.players = players;
		this.regions = regions;
		this.about_region = document.getElementById('about-region');
		this.setPlayersRegions();
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
		for (let i = 0; i < this.players.length; i++ ) {
			this.players[i].addRegion(this.regions[i]);
		}
	}

	/**
	 * @param x
	 * @param y
	 * @return {boolean}
	 */
	isElementOfChangeCanvas(x, y) {
		return !!inHex(x, y, this.switcher.arrX, this.switcher.arrY);
	}

	/**
	 * подписываемся на события кликов мышки
	 */
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
			console.log(curRegion.neighbour);
			switch (curPlayer.status) {
				case PLAYER_STATES.DEFAULT:
					if (!curPlayer.isTheRegionOfPlayer(curRegion)) {
						return;
					}
					curPlayer.status = PLAYER_STATES.READY;
					aboutRegion(curRegion, this.about_region);
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
					aboutRegion(curRegion, this.about_region);
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

	}
}

//todo:: ходит только первый бот

//todo:: бот может сходить в молоко

//todo:: придумать как убирать соседей