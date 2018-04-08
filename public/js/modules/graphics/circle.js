/* eslint-disable no-undef */
import Figure from './figure.js';

export default class Circle extends Figure {
	constructor() {
		super();
		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.innerHTML = generateCanvas(
			{
				'width': 500,
				'height':500,
				'id': 'circle'
			}
		);
		this.parent.appendChild(this.wrapper);
		this.canvas = document.getElementById('circle');
		this.ctx = this.canvas.getContext('2d');
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.lineWidth = 10;
		this.ctx.arc(100, 100, 50, 0, 2*Math.PI);
		this.ctx.stroke();
		this.ctx.closePath();
		this.setOnClick();
		return this.wrapper;
	}

	setOnClick() {
		this.canvas.addEventListener('click', (ev) => {
			if (this.ctx.isPointInPath(ev.x, ev.y)) {
				alert('2');
			}
		});
	}
}