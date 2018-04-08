/* eslint-disable no-undef */
import Section from '../baseView.js';
import Hexagon from '../../../modules/graphics/hexagon.js';
import inPoly from '../../../modules/game/core/core.js';

export default class GameSection extends Section {
	constructor () {
		super();
		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.innerHTML = generateCanvas(
			{
				'width': screen.width,
				'height':screen.height
			}
		);
		this.parent.appendChild(this.wrapper);
		this.canvas = document.getElementById('game-canvas');
	}

	render() {

		this.ctx = this.canvas.getContext('2d');
		this.figures = [
			{
				name: 'hex1',
				color: 'red',
				figure: new Hexagon(this.ctx, 500, 500, 'red')
			},
			{
				name: 'hex2',
				color: 'yellow',
				figure: new Hexagon(this.ctx, 650, 413.4, 'yellow')
			},
			{
				name: 'hex3',
				color: 'white',
				figure: new Hexagon(this.ctx, 650, 586.6, 'white')
			},
			{
				name: 'hex4',
				color: 'green',
				figure: new Hexagon(this.ctx, 500, 326.8, 'green')
			},
			{
				name: 'hex5',
				color: 'cyan',
				figure: new Hexagon(this.ctx, 800, 500, 'cyan')
			}
		];

		this.canvas.addEventListener('click', event => {

			this.figures.forEach( (obj) => {
				if (inPoly(event.x, event.y, obj.figure.xp, obj.figure.yp)) {
					//TODO::something click
				}
			});
		});

		this.canvas.addEventListener('mousemove', event => {

			this.figures.forEach( (obj) => {
				if (inPoly(event.x, event.y, obj.figure.xp, obj.figure.yp)) {
					console.log('orange');
					obj.figure.reDraw('orange');
				}
				else {
					obj.figure.reStore();
				}
			});
		});


		return this.wrapper;
	}
	allowed() {
		// return User.isAuthorized();
		return true;
	}
}