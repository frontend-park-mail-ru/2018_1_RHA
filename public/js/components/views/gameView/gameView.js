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
				'height':screen.height,
				'id' : 'game-canvas'
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
				figure: new Hexagon(this.ctx, 500, 500)
			},
			{
				name: 'hex2',
				figure: new Hexagon(this.ctx, 650, 413.4)
			},
			{
				name: 'hex3',
				figure: new Hexagon(this.ctx, 650, 586.6)
			},
			{
				name: 'hex4',
				figure: new Hexagon(this.ctx, 500, 326.8)
			},
			{
				name: 'hex5',
				figure: new Hexagon(this.ctx, 800, 500)
			}
		];

		this.canvas.addEventListener('click', event => {

			this.figures.forEach( (obj) => {
				if (inPoly(event.x, event.y, obj.figure.xp, obj.figure.yp)) {
					alert(obj.name);
				}
			});
		});
		return this.wrapper;
	}
	allowed() {
		// return User.isAuthorized();
		return true;
	}

	setOnClick(ctx) {
		this.canvas.addEventListener('click', (ev) => {
			if (ctx.isPointInPath(ev.x, ev.y)) {
				alert('!!!');
			}
		});
	}
}