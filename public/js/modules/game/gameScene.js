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
		this.players.forEach( (obj, i) => {
			obj.addRegion(this.regions[i]);
		});
		//todo:
		this.players[0].active = true;

		return this.wrapper;
	}

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

	activeRegion() {
		this.regions.forEach( (obj) => {
			if (obj.selected === true) {
				return obj;
			}
		});
	}



	onListeners() {
		bus.on('left-click', data => {
			const coordinates = data.payload;
			if (this.status.DISABLED) {
				return;
			}
			const curRegion = this.isRegion(coordinates.x, coordinates.y);
			console.log(curRegion, 'aaa');
			if (!curRegion) {
				return;
			}

			switch (this.status) {
				case PLAYER_STATES.DEFAULT:
					debugger;
					const curPlayer = this.currentPlayer();
					console.log(curPlayer);
					if (!this.currentPlayer().isTheRegionOfPlayer(curRegion)) {
						return;
					}
					this.status = PLAYER_STATES.READY;
					//TODO:
					bus.emit('select-region', curRegion);
					break;
				case PLAYER_STATES.READY:
					if (!this.currentPlayer().isTheRegionOfPlayer(curRegion)) {
						return;
					}
					bus.emit('change-selection',
						{
							active: this.activeRegion(),
							new: curRegion
						});
					break;
			}


		});
		// this.canvas.addEventListener('click', event => {
		// 	this.regions.forEach( (obj) => {
		// 		//todo:: отправить событие на шину, сигнализирующее о том, что мы выбрали какой то объект
		// 		if (inPoly(event.x, event.y, obj.figure.xp, obj.figure.yp)) {
		// 			if (obj.selected === false) {
		// 				obj.selected = true;
		// 				obj.figure.reDraw('red', 3);
		// 			} else {
		// 				obj.selected = false;
		// 				obj.figure.reDraw('black',3);
		// 			}
		// 		}
		// 	});
		// });
		//
		// document.addEventListener('mousemove', event => {
		// 	this.regions.forEach( (obj) => {
		// 		if (obj.selected === true || inPoly(event.x, event.y, obj.figure.xp, obj.figure.yp)) {
		// 			obj.figure.reDraw('red', 3);
		// 		} else {
		// 			obj.figure.reDraw('black', 3);
		// 		}
		// 	});
		// });
	}
}