import Figure from './figure.js';

export default class Switcher extends Figure {
	constructor(a, canvas, x, y) {
		super();
		this.a = a;
		this.x = x;
		this.y = y;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.draw();
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(this.x - this.a * 0.866, this.y + this.a / 2);
		this.ctx.lineTo(this.x - this.a * 0.866, this.y - this.a / 2);
		this.ctx.lineTo(this.x, this.y);
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 3;
		this.ctx.strokeStyle = 'black';
		this.ctx.stroke();
		this.ctx.fillStyle = '#C0C0C0';
		this.ctx.fill();
		this.ctx.closePath();
	}
}