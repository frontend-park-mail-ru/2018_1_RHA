/* eslint-disable no-undef */
import Section from '../baseView.js';
import inPoly from '../../../modules/game/inPoly.js';
import GameScene from '../../../modules/game/gameScene.js';
import Controller from '../../../modules/game/controller.js';
import GameManager from '../../../modules/game/gameManager.js';
import Player from '../../../modules/game/player.js';

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
		this.controller = new Controller(this.canvas);
		this.controller.start();
		this.players = [
			new Player()
		];
		this.scene  = new GameScene(this.canvas, this.canvas.getContext('2d'), this.players);
		this.scene.onListeners();
		this.manager = new GameManager();
		this.scene.render();

		return this.wrapper;
	}

	allowed() {
		// return User.isAuthorized();
		return true;
	}



}