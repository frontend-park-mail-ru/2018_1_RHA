/* eslint-disable indent */
import Hexagon from '../graphics/hexagon.js';
import inPoly from './inPoly.js';
import bus from '../bus.js';
import PLAYER_STATES from './playerStates.js';

export default class GameScene {
	constructor(canvas, ctx, players) {
		this.canvas  = canvas;
		this.ctx = ctx;
		this.players = players;
		this.status = PLAYER_STATES.DEFAULT;
	}

	render() {
		//todo: регионы, которые принадлежат игроку должны быть окрашены в один цвет
		this.regions = [
			{
				name: 'hex1',
				color: 'red',
				figure: new Hexagon(this.ctx, 500, 500, 'black'),
				selected: false
			},
			{
				name: 'hex2',
				color: 'yellow',
				figure: new Hexagon(this.ctx, 650, 413.4, 'yellow'),
				selected: false
			},
			{
				name: 'hex3',
				color: 'white',
				figure: new Hexagon(this.ctx, 650, 586.6, 'white'),
				selected: false
			},
			{
				name: 'hex4',
				color: 'green',
				figure: new Hexagon(this.ctx, 500, 326.8, 'green'),
				selected: false
			},
			{
				name: 'hex5',
				color: 'cyan',
				figure: new Hexagon(this.ctx, 800, 500, 'cyan'),
				selected: false
			}
		];

		//Раздаем каждому игроку по зоне
		// this.players.forEach( (obj, i) => {
		// 	obj.addRegion(this.regions[i]);
		// });
		//todo: просто дал одному пользователю права рулить и пару регионов(желтый и белый)
		this.players[0].active = true;
		this.players[0].addRegion(this.regions[1]);
		this.players[0].addRegion(this.regions[2]);

		return this.wrapper;
	}


	//TODO: все циклы return'ящие что то, должны быть оформлены в таком виде
	//текущий игрок
	currentPlayer() {
		for (let i = 0; i < this.players.length; ++i) {
			if (this.players[i].active) {
				return this.players[i];
			}
		}
	}


	//возвращает регион, если такой существует
	isRegion(x, y) {
		for (let i = 0; i < this.regions.length; ++i) {
			if (inPoly(x, y, this.regions[i].figure.xp, this.regions[i].figure.yp)) {
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