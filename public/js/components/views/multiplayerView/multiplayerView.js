/* eslint-disable no-undef */
import Section from '../baseView.js';
import bus from '../../../modules/bus.js';
import Game from '../../../modules/game/game.js';
import Coordinate from '../../../modules/game/config/coordinate.js';
import {GameModes} from '../../../modules/game/config/modes.js';
let generateCanvas = require('../gameView/gameTemplate.pug');

export default class MultiplayerSection extends Section {
	constructor() {
		super();
		this.parent = document.getElementById('game');
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('wrapper');
		this.winWidth = null;
		this.winHeight = null;
		this.winWidth = window.innerWidth;
		this.winHeight = this.winWidth * 0.5625; //соотношение 16:9
		//todo упростить
		if (window.innerHeight > window.innerWidth) {
			this.height_canv = window.innerWidth * 0.85; //максимально возможная высота канваса
		}
		else {
			this.height_canv = window.innerHeight * 0.85;
		}

		if (this.winHeight >= window.innerHeight) {
			this.winHeight = window.innerHeight;
			//this.height_canv = this.winHeight * 0.85;
		}

		this.wrapper.innerHTML += generateCanvas(
			{
				'width': window.innerWidth * 0.7,
				'height': window.innerWidth * 0.525 * 0.83,
				'id': 'multiplayer-canvas'
			}
		);

		// this.wrapper.getElementsByClassName('info-menu')[0].setAttribute('style', window.innerWidth * 0.525 * 0.83);
		this.parent.appendChild(this.wrapper);
		this.game_canvas = document.getElementById('multiplayer-canvas');
		this.ctx = this.game_canvas.getContext('2d');
		this.beforeResize = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		this.game_canvas.style.marginTop = String(100 - 100 * this.game_canvas.height / this.height_canv) / 2 + '%';


	}

	render() {

		this.img = new Image();
		this.img.src = '/map.png';
		this.load = new Promise((resolve, reject) => {
			this.img.onload = () => {
				resolve(this.ctx.drawImage(this.img, 0, 0, this.game_canvas.width, this.game_canvas.height));
			};
		});
		this.load
			.then(
				() => {
					this.setWindowResizeHandler();
					this.listenOrientation();
					this.coordinate = new Coordinate(this.game_canvas);
					this.changeBut = this.wrapper.getElementsByClassName('change')[0];
					this.game = new Game(GameModes.multiplayer, this.game_canvas, this.coordinate, this.changeBut, this.img);
					// this.game.start();

				}
			);

		return this.wrapper;
	}

	allowed() {
		return true;
	}

	computeCanvasSize() {
		// const size = (window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth;
		return [window.innerWidth * 0.7, window.innerWidth * 0.525 * 0.83];
	}

	listenOrientation() {
		let mql = window.matchMedia('(orientation: portrait)');
		if (mql.matches) {
			const overlayOrientation = document.createElement('div');
			this.wrapper.appendChild(overlayOrientation);
			overlayOrientation.classList.add('overlayOrientation');
			overlayOrientation.innerText = 'Change to the landscape orientation';
		}
		mql.addListener(m => {
			if (m.matches) {
				const overlayOrientation = document.createElement('div');
				this.wrapper.appendChild(overlayOrientation);
				overlayOrientation.classList.add('overlayOrientation');
				overlayOrientation.innerText = 'Change to the landscape orientation';

			}
			else {
				this.height_canv = window.innerHeight * 0.85;
				this.wrapper.removeChild(this.wrapper.lastChild);
			}
		});
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



