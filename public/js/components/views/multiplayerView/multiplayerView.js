/* eslint-disable no-undef */
import Coordinate from '../../../modules/game/config/coordinate.js';
import {GameModes} from '../../../modules/game/config/modes.js';
let generateCanvas = require('./multiGameCanvas.pug');
let generateFinishMenu = require('./finishGameMenu.pug');
import Game from '../../../modules/game/game.js';
import Router from '../../../modules/router.js';
import User from '../../../modules/userModel';
import bus from '../../../modules/bus.js';
import Section from '../baseView.js';


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
			this.height_canv = window.innerWidth; //максимально возможная высота канваса
		}
		else {
			this.height_canv = window.innerHeight;
		}

		if (this.winHeight >= window.innerHeight) {
			this.winHeight = window.innerHeight;
			//this.height_canv = this.winHeight * 0.85;
		}

		this.setBusListeners();
	}

	render() {
		this.wrapper.innerHTML += generateCanvas(
			{
				'width': window.innerWidth * 0.7,
				'height': this.winHeight,
				'id': 'multiplayer-canvas',
			}
		);



		this.wrapper.getElementsByClassName('exit-button')[0].addEventListener('click', () => {
			new Router().open('/');
			window.location.reload();
		});

		this.parent.appendChild(this.wrapper);
		this.game_canvas = document.getElementById('multiplayer-canvas');
		this.ctx = this.game_canvas.getContext('2d');
		this.beforeResize = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		this.game_canvas.style.marginTop = String(100 - 100 * this.game_canvas.height / this.height_canv) / 2 + '%';

		const multi_username = document.getElementById('multi-username');
		multi_username.innerText = User.getCurUser().username;
		const multi_rating = document.getElementById('multi-rating');
		multi_rating.innerText = 'Rating  ' + User.getCurUser().rating;

		this.setWindowResizeHandler();
		this.listenOrientation();
		this.coordinate = new Coordinate(this.game_canvas);
		this.changeBut = this.wrapper.getElementsByClassName('change')[0];
		this.game = new Game(GameModes.multiplayer, this.game_canvas, this.coordinate, this.changeBut, this.img, this.wrapper);
		return this.wrapper;
	}

	allowed() {
		// return true;
		return User.isAuthorized();
	}

	computeCanvasSize() {
		// const size = (window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth;
		return [window.innerWidth * 0.7, window.innerWidth * 0.5625];
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
				this.height_canv = window.innerHeight;
				this.wrapper.removeChild(this.wrapper.lastChild);
			}
		});
	}

	setWindowResizeHandler() {
		window.addEventListener('resize', () => {
			let sizes = this.computeCanvasSize();
			if (sizes[1] >= window.innerHeight) {
				sizes[1] = window.innerHeight;
			}
			[this.game_canvas.width, this.game_canvas.height] = sizes;
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
				this.height_canv = window.innerHeight;
			}
			this.beforeResize = {
				width: this.game_canvas.width,
				height: this.game_canvas.height
			};

			bus.emit('resize-for-draw-m', {});
		});
		return this;
	}

	setBusListeners() {
		bus.on('FinishGameResult', (data) => {
			const result = data.payload.result;
			this.finishGameMenu = generateFinishMenu({
				result: result,
				text1: 'Again',
				text2: 'Close'
			});
			this.wrapper.innerHTML += this.finishGameMenu;
			document.getElementById('close_multiplayer').addEventListener('click', () => {
				bus.emit('CloseFinishGame');
			});
			document.getElementById('one_more_game').addEventListener('click', () => {
				bus.emit('OneMoreGame');
			});
		});

		bus.on('CloseFinishGame', () => {
			this.wrapper.children[this.wrapper.children.length - 1].remove();
			new Router().open('/');
		});

		bus.on('OneMoreGame', () => {
			window.location.reload();
		});
	}
}



