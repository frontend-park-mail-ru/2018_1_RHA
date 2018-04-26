/* eslint-disable no-undef */
import Section from '../baseView.js';
import Game from '../../../modules/game/game.js';
import bus from '../../../modules/bus.js';
import Coordinate from '../../../modules/game/config/coordinate.js';
import Input from '../../blocks/input/input.js';


/**
 * Class representing Section of the game
 */
export default class GameSection extends Section {
	/**
	 * Creates game section
	 */
	constructor() {
		super();

		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('wrapper');
		console.log(screen.width, ' ', document.documentElement.clientWidth);


		this.wrapper.innerHTML += generateCanvas(
			{
				'width': window.innerWidth * 0.7,
				'height': window.innerWidth * 0.525 * 0.83,
				'id': 'game-canvas'
			}
		);
		this.parent.appendChild(this.wrapper);
		this.game_canvas = document.getElementById('game-canvas');
		this.ctx = this.game_canvas.getContext('2d');
		let img = new Image();
		img.src = '/map.png';
		img.onload = () => {
			//let pattern = this.ctx.createPattern(img, 'repeat');
			this.ctx.drawImage(img, 10,10);
			bus.emit('load-img', {});
		};

		//this.ctx.fillStyle = this.ctx.createPattern(img, 'repeat');
		// this.ctx.fillRect(10, 10, 150, 150);
		// this.ctx.strokeRect(10, 10, 150, 150);
		bus.on('load-img', () => {
			this.coordinate = new Coordinate(this.game_canvas);
			this.setWindowResizeHandler();
		});

	}

	/**
	 * @return {HTMLDivElement | *}
	 */
	render() {
		bus.on('load-img', () => {
			this.changeBut = this.wrapper.getElementsByClassName('change')[0];
			this.game = new Game({}, this.game_canvas, this.coordinate, this.changeBut);
			this.game.start();
		});

		return this.wrapper;
	}

	/**
	 * @return {boolean}
	 */
	allowed() {
		// return User.isAuthorized();
		return true;
	}

	computeCanvasSize() {
		// const size = (window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth;
		return [window.innerWidth * 0.7, window.innerWidth * 0.525 * 0.83];
	}

	setWindowResizeHandler() {
		window.addEventListener('resize', () => {
			[this.game_canvas.width, this.game_canvas.height] = this.computeCanvasSize();
			this.coordinate.reSize(this.game_canvas);
			bus.emit('resize-for-draw', {});
		});
		return this;
	}
}
