/* eslint-disable no-undef */
import Section from '../baseView.js';
import inPoly from '../../../modules/game/inPoly.js';
import GameScene from '../../../modules/game/gameScene.js';
import GameManager from '../../../modules/game/gameManager.js';

export default class GameSection extends Section {
	constructor () {
		super();
		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.innerHTML = generateCanvas(
			{
				'width': screen.width,
				'height':screen.height,
				'id' : 'game-canvas'
			}
		);
		this.parent.appendChild(this.wrapper);
		this.canvas = document.getElementById('game-canvas');
		//this.setOnClick(this.canvas.getContext('2d'));
	}

	render() {
		this.scene  = new GameScene(this.canvas, this.canvas.getContext('2d'));
		this.scene.render();

		this.manager = GameManager();
		return this.wrapper;
	}

	allowed() {
		// return User.isAuthorized();
		return true;
	}



	// setOnClick(ctx) {
	// 	// this.canvas.addEventListener('click', (ev) => {
	// 	// 	if (ctx.isPointInPath(ev.x, ev.y)) {
	// 	//
	// 	// 	}
	// 	// });
	//
	//
	// }
}