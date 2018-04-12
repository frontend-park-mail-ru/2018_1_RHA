import Section from '../baseView.js';
import GameScene from '../../../modules/game/gameScene.js';
import Controller from '../../../modules/game/controller.js';
import GameManager from '../../../modules/game/gameManager.js';
import Player from '../../../modules/game/player/player.js';
import Game from '../../../modules/game/game.js';

export default class GameSection extends Section {
	constructor () {
		super();

		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.innerHTML = generateCanvas(
			{
				'width': screen.width * 0.9,
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
		//this.setOnClick(this.canvas.getContext('2d'));
	}

	render() {

		this.game = new Game({}, this.game_canvas, this.change_canvas);
		this.game.start();

		return this.wrapper;
	}

	allowed() {
		// return User.isAuthorized();
		return true;
	}

}