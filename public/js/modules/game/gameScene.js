import Hexagon from '../graphics/hexagon.js';
import inPoly from './inPoly.js';

export default class GameScene {
	constructor(canvas, ctx) {
		this.canvas  = canvas;
		this.ctx = ctx;
		this.setListeners();
	}

	render() {
		this.figures = [
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
		this.players = [];

		return this.wrapper;
	}

	setListeners() {
		this.canvas.addEventListener('click', event => {
			this.figures.forEach( (obj) => {
				//todo:: отправить событие на шину, сигнализирующее о том, что мы выбрали какой то объект
				if (inPoly(event.x, event.y, obj.figure.xp, obj.figure.yp)) {
					if (obj.selected === false) {
						obj.selected = true;
						obj.figure.reDraw('red', 3);
					} else {
						obj.selected = false;
						obj.figure.reDraw('black',3);
					}
				}
			});
		});

		this.canvas.addEventListener('mousemove', event => {
			this.figures.forEach( (obj) => {
				if (obj.selected === true || inPoly(event.x, event.y, obj.figure.xp, obj.figure.yp)) {
					obj.figure.reDraw('red', 3);
				} else {
					obj.figure.reDraw('black', 3);
				}
			});
		});
	}
}