import Section from '../baseView.js';
import Game from '../../../modules/game/game.js';

/**
 * Class representing Section of the game
 */
export default class GameSection extends Section {
	/**
	 * Creates game section
	 */
	constructor () {
		super();

		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.innerHTML = generateCanvas(
			{
				'width': screen.width * 0.8,
				'height':screen.height,
				'id' : 'game-canvas'
			}
		);
		this.wrapper.innerHTML += generateCanvas(
			{
				'width': screen.width * 0.1,
				'height':screen.height,
				'id' : 'change-canvas'
			}
		);
		this.parent.appendChild(this.wrapper);
		this.game_canvas = document.getElementById('game-canvas');
		this.change_canvas = document.getElementById('change-canvas');
	}

	/**
	 * @return {HTMLDivElement | *}
	 */
	render() {

		this.game = new Game({}, this.game_canvas, this.change_canvas);
		this.game.start();

		return this.wrapper;
	}

	/**
	 * @return {boolean}
	 */
	allowed() {
		// return User.isAuthorized();
		return true;
	}

}