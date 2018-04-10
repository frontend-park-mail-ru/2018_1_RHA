import Controller from './controller.js';
import GameScene from './gameScene.js';
import GameManager from './gameManager.js';
import Player from './player/player.js';
import Region from './components/region.js';
import allowedCoordinates from './config/allowedCoordinates.js';
import Switcher from '../graphics/switcher.js';
import Circle from '../graphics/circle.js';


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
			new Player('second','blue'),
			new Player('third', 'crimson'),
			new Player('forth', 'silver'),
			new Player('admin', 'pink'),
		];
		this.regions = [];
		this.players.forEach( (player) => {
			this.regions.push(new Region(player.name + '_area', player,
				this.ctx, allowedCoordinates));
		});


		this.scene = new GameScene(this.canvas, this.players, this.regions);
		this.manager = new GameManager();
		this.switcher = new Switcher(70, this.canvas, 100, 100);
		// this.kaka = new Circle(100, 100, 50, this.canvas);
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