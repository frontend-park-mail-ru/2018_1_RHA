/* eslint-disable no-undef */
import Section from '../baseView.js';
import Game from '../../../modules/game/game.js';
import bus from '../../../modules/bus.js';
import Coordinate from '../../../modules/game/config/coordinate.js';
import {GameModes} from '../../../modules/game/config/modes.js';


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

		this.wrapper.innerHTML += generateCanvas(
			{
				'width': window.innerWidth * 0.7,
				'height': window.innerWidth * 0.525 * 0.83,
				'id': 'game-canvas'
			}
		);
		this.height_canv = window.innerHeight * 0.83;
		this.parent.appendChild(this.wrapper);
		this.game_canvas = document.getElementById('game-canvas');
		this.ctx = this.game_canvas.getContext('2d');

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
		return [window.innerWidth * 0.7, window.innerWidth * 0.525 * 0.83];
	}

	setWindowResizeHandler() {
		window.addEventListener('resize', () => {
			let beforeResize = {
				width: this.game_canvas.width,
				height: this.game_canvas.height
			};
			[this.game_canvas.width, this.game_canvas.height] = this.computeCanvasSize();
			this.ctx.drawImage(this.img, 0, 0, this.game_canvas.width, this.game_canvas.height);
			this.coordinate.reSize(this.game_canvas);

			this.game_canvas.style.marginTop = String(100 - 100 * this.game_canvas.height / this.height_canv) / 2 + '%';

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
