/* eslint-disable indent,no-case-declarations */
import Hexagon from '../graphics/hexagon.js';
import inPoly from './inPoly.js';
import bus from '../bus.js';
import PLAYER_STATES from './playerStates.js';

export default class GameScene {
	constructor(canvas, players, regions) {
		this.canvas  = canvas;
		this.ctx = canvas.getContext('2d');
		this.players = players;
		this.status = PLAYER_STATES.DEFAULT;
		this.regions = regions;
	}

	render() {
		//todo: регионы, которые принадлежат игроку должны быть окрашены в один цвет


		this.players[0].status = PLAYER_STATES.DEFAULT;
		this.setPlayersRegions();
	}

	//TODO: все циклы return'ящие что то, должны быть оформлены в таком виде
	//текущий игрок
	currentPlayer() {
		for (let i = 0; i < this.players.length; ++i) {
			// TODO проверить работает ли это условие
			if (this.players[i].status !== PLAYER_STATES.DISABLED !== PLAYER_STATES.LOSE ) {
				return this.players[i];
			}
		}
	}

	//возвращает регион, если такой существует
	isRegion(x, y) {
		for (let i = 0; i < this.regions.length; ++i) {
			if (inPoly(x, y, this.regions[i].area.xp, this.regions[i].area.yp)) {
				return this.regions[i];
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

	//подписываемся на события кликов мышки
	onListeners() {
		bus.on('left-click', data => {
			const coordinates = data.payload;
			if (this.status.DISABLED) {
				return;
			}
			const curRegion = this.isRegion(coordinates.x, coordinates.y);
			if (!curRegion) {
				return;
			}

			switch (this.status) {
				case PLAYER_STATES.DEFAULT:
					const curPlayer = this.currentPlayer();
					if (!curPlayer.isTheRegionOfPlayer(curRegion)) {
						return;
					}
					this.status = PLAYER_STATES.READY;
					bus.emit('select-region', curRegion);
					break;
				case PLAYER_STATES.READY:
					if (!this.currentPlayer().isTheRegionOfPlayer(curRegion)) {
						return;
					}

					//если нажали на выделенный регион
					if (curRegion === this.activeRegion()) {
						this.status = PLAYER_STATES.DEFAULT;
					}

					bus.emit('change-selection',
						{
							active: this.activeRegion(),
							new: curRegion
						});
					break;
			}
		});

	}
}