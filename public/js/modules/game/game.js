import Controller from './controller.js';
import GameScene from './gameScene.js';
import GameManager from './gameManager.js';
import Player from './player.js';
import Region from './region.js';
import allowedCoordinates from './allowedCoordinates.js';


export default class Game {
	constructor(mode, canvas) {
		//let GameConstructor = null;

		//todo:: онлайн и оффлайн режимы
		this.mode = mode;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.controller = new Controller(this.canvas);
		this.players = [
			new Player('first','green'),
			new Player('second','blue')
		];
		this.regions = [];
		this.players.forEach( (player) => {
			this.regions.push(new Region(player.name + '_area', player.color,
				this.ctx, allowedCoordinates));
		});


		this.scene = new GameScene(this.canvas, this.players, this.regions);
		this.manager = new GameManager();
		this.scene.render();
	}

	start() {
		this.controller.start();
		this.scene.onListeners();
		this.manager.start();
	}

	destroy() {
		this.controller.destroy();
		this.manager.destroy();
	}
}