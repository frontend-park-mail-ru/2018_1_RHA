// import typeImages from '../../config/typeImages';
import bus from '../../../bus.js';
const getHexBack = require('./hexBackground.pug');

const typeImages = [
	'',
	'/forest.png',
	'/forest.png',
	'/forest.png',
	'/forest.png',
	'/forest.png',
	'/forest.png',
	'/forest.png',
	'/forest.png'
];

export default class AreaType {
	constructor(type, x, y, radius) {
		this.type = type;
		this.xCor = x;
		this.yCor = y;
		this.radius = radius;
		// this.imgURL = typeImages[parseInt(type)]; // тут БАГА
		this.imgURL = '/forest.png';
		this.element = document.createElement('div');
		this.element.innerHTML = getHexBack({
			imgSrc: this.imgURL,
			width: this.radius * 1.8,
			height: this.radius * 1.8
		});
		// document.getElementById('game').appendChild(this.element); //root elem
		document.getElementsByClassName('canvas-wrap')[0].appendChild(this.element);
		this.setBusListeners();
	}

	resize() {

	}

	setBusListeners() {
		bus.on('resize-for-draw', this.resize);
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