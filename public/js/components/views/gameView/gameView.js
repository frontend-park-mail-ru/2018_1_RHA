/* eslint-disable no-undef */
import Section from '../baseView.js';
import Game from '../../../modules/game/game.js';
import bus from '../../../modules/bus.js';
import Coordinate from '../../../modules/game/config/coordinate.js';


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

		this.coordinate = new Coordinate(this.game_canvas);
	}

	/**
	 * @return {HTMLDivElement | *}
	 */
	render() {
		this.changeBut = this.wrapper.getElementsByClassName('change')[0];
		this.game = new Game({}, this.game_canvas, this.coordinate, this.changeBut);
		this.game.start();
		this.setWindowResizeHandler();
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
