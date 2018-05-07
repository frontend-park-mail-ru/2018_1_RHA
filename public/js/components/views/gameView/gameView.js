/* eslint-disable no-undef */
import Section from '../baseView.js';
import Game from '../../../modules/game/game.js';
import bus from '../../../modules/bus.js';
import Coordinate from '../../../modules/game/config/coordinate.js';
import {GameModes} from '../../../modules/game/config/modes.js';
let generateCanvas = require('./gameTemplate.pug');

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
		let winWidth = null;
		let winHeight = null;
		if (window.innerHeight > window.innerWidth) {
			winWidth = window.innerHeight;
			winHeight = winWidth * 0.5625; //соотношение 16:9
			this.height_canv = window.innerWidth * 0.85;
		}
		else {
			winWidth = window.innerWidth;
			winHeight = winWidth * 0.5625; //соотношение 16:9
			this.height_canv = window.innerHeight * 0.85;
		}

		if (winHeight >= window.innerHeight) {
			winHeight = window.innerHeight;
		}

		this.wrapper.innerHTML += generateCanvas(
			{
				'width': winWidth * 0.7,
				'height':winHeight * 0.85,
				'id': 'game-canvas'
			}
		);

		this.parent.appendChild(this.wrapper);
		this.game_canvas = document.getElementById('game-canvas');
		this.ctx = this.game_canvas.getContext('2d');

		this.beforeResize = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		console.log(this.game_canvas.width);
		this.game_canvas.style.marginTop = String(100 - 100 * this.game_canvas.height / this.height_canv) / 2 + '%';

	}
	/**
	 * @return {HTMLDivElement | *}
	 */
	render() {

		this.img = new Image();
		this.img.src = '/map.png';
		this.load = new Promise(resolve => {
			this.img.onload = () => {
				resolve(this.ctx.drawImage(this.img, 0,0, this.game_canvas.width, this.game_canvas.height));
			};
		});
		this.load
			.then(
				() => {
					this.setWindowResizeHandler();
					this.coordinate = new Coordinate(this.game_canvas);
					this.changeBut = this.wrapper.getElementsByClassName('change')[0];
					this.game = new Game(GameModes.singleplayer, this.game_canvas, this.coordinate, this.changeBut, this.img);
					this.game.start();
				}
			);

		bus.on('gameover', () => {
			alert('gameover');
			this.game.destroy();
			history.go('/singleplayer');
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
		return [window.innerWidth * 0.7, window.innerWidth * 0.5625 * 0.85];
	}

	setWindowResizeHandler() {
		window.addEventListener('resize', () => {
			let sizes = this.computeCanvasSize();
			if (sizes[1] >= window.innerHeight * 0.85) {
				sizes[1] = window.innerHeight * 0.85;
			}
			[this.game_canvas.width, this.game_canvas.height] = sizes;
			this.ctx.drawImage(this.img, 0, 0, this.game_canvas.width, this.game_canvas.height);
			this.coordinate.reSize(this.game_canvas);
			let margin = 100 - 100 * this.game_canvas.height / this.height_canv;
			if (margin <= 0) {
				margin = 0;
			}
			if (this.game_canvas.width !== this.beforeResize.width) {
				this.game_canvas.style.marginTop = String(margin) / 2 + '%';
			}
			else {
				this.game_canvas.style.marginTop = String(margin) / 2 + '%';
				// this.game_canvas.style.marginTop = '0';
				this.height_canv = window.innerHeight * 0.85;
			}
			this.beforeResize = {
				width: this.game_canvas.width,
				height: this.game_canvas.height
			};

			bus.emit('resize-for-draw', {});
		});
		return this;
	}
}



//todo инструкция
//todo синглплеер ~ треня
//todo графоний


// интерфейс по красоте, установить другой фон
// реализовать логику выбора юнитов(их кол-во для атаки)
// анимации
