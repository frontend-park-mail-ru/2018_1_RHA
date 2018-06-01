
// import bus from '../bus';
// import {typeImages} from '../game/config/typeImages.js';

const typeImagess = [
	'',
	'/img/field.png',
	'/img/desert.png',
	'/img/forest.png',
	'/img/grass-hill.png',
	'/img/desert-hill.png',
	'/img/forest-hill.png',
	'/img/mount.png',
	'/img/city.png'
];


export default class Kexagon {
	constructor(name, canvas, x, y, r, color, type) {
		this.name = name;
		this.canvas = canvas;
		this.game_ctx = this.canvas.getContext('2d');
		this.xC = x;
		this.yC = y;
		this.R = r;
		this.color = color;
		this.type = type;
		this.strokeColor = 'black';
		this.img = new Image();
		this.img.src = typeImagess[this.type];
		this.img.onload = () => {
			this.game_ctx.drawImage(
				this.img,
				this.xC - this.R * 1.3 / 2 * this.canvas.width / 1000,
				this.yC - this.R * 1.6 / 2 * this.canvas.height / 610,
				this.R * 1.3  * this.canvas.width / 1000,
				this.R * 1.3  * this.canvas.height / 610
			);
		};
	}

	setColor(color) {
		this.color = color;
	}

	getColor() {
		return this.color;
	}

	setStroke(color) {
		this.strokeColor = color;
	}

	draw() {
		const amountofCoorX = 1000;
		const amountofCoorY = 610;
		this.dR = this.R * 0.866;
		this.xp = [
			this.xC - this.R * this.canvas.width / amountofCoorX,
			this.xC - this.R / 2 *  this.canvas.width / amountofCoorX,
			this.xC + this.R / 2 *  this.canvas.width / amountofCoorX,
			this.xC + this.R * this.canvas.width / amountofCoorX,
			this.xC + this.R / 2 * this.canvas.width / amountofCoorX,
			this.xC - this.R / 2 * this.canvas.width / amountofCoorX,
			this.xC - this.R * this.canvas.width / amountofCoorX
		];
		this.yp = [
			this.yC,
			this.yC + this.dR * this.canvas.height / amountofCoorY,
			this.yC + this.dR * this.canvas.height / amountofCoorY,
			this.yC,
			this.yC - this.dR * this.canvas.height / amountofCoorY,
			this.yC - this.dR * this.canvas.height / amountofCoorY,
			this.yC
		];
		this.game_ctx.beginPath();
		this.game_ctx.lineJoin = 'round';
		this.game_ctx.lineWidth = 4;
		this.game_ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.game_ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.game_ctx.strokeStyle = this.strokeColor;
		this.game_ctx.stroke();
		this.game_ctx.fillStyle = this.color;
		this.game_ctx.fill();

		this.game_ctx.drawImage(
			this.img,
			this.xC - this.R * 1.3 / 2 * this.canvas.width / 1000,
			this.yC - this.R * 1.6 / 2 * this.canvas.height / 610,
			this.R * 1.3  * this.canvas.width / 1000,
			this.R * 1.3  * this.canvas.height / 610
		);
		this.game_ctx.closePath();
	}

	reColor () {
		const amountofCoorX = 1000;
		const amountofCoorY = 610;
		this.xp = [
			this.xC - this.R * this.canvas.width / amountofCoorX,
			this.xC - this.R / 2 *  this.canvas.width / amountofCoorX,
			this.xC + this.R / 2 *  this.canvas.width / amountofCoorX,
			this.xC + this.R * this.canvas.width / amountofCoorX,
			this.xC + this.R / 2 * this.canvas.width / amountofCoorX,
			this.xC - this.R / 2 * this.canvas.width / amountofCoorX,
			this.xC - this.R * this.canvas.width / amountofCoorX
		];
		this.yp = [
			this.yC,
			this.yC + this.dR * this.canvas.height / amountofCoorY,
			this.yC + this.dR * this.canvas.height / amountofCoorY,
			this.yC,
			this.yC - this.dR * this.canvas.height / amountofCoorY,
			this.yC - this.dR *this.canvas.height / amountofCoorY,
			this.yC
		];
		this.game_ctx.beginPath();
		this.game_ctx.moveTo(this.xp[0], this.yp[0]);
		for (let i = 1; i < this.xp.length; ++i) {
			this.game_ctx.lineTo(this.xp[i], this.yp[i]);
		}
		this.game_ctx.strokeStyle = 'rgba(255,255,255,0.8)';
		this.game_ctx.stroke();
		this.game_ctx.closePath();
	}
}

//Different types:
//0:water(no can simply walk into water(Vice city version))
//1:grass field(grain or other crops, the simplest terrain)
//2:sand desert(almost no reinforcements here, defending is harder)
//3:forest (easy to defend, less reinforcements)
//4:grass hills (easier to defend, normal reinforcements as well)
//5:foresty hills ( wery easy to defend, as much reinforcements as in forest)
//6:sand hills (a bit better then send)
//7:mountains(the best thing to defend, but no reinforcements)
//8:city(good thing to defend, and lots of reinforcements too)