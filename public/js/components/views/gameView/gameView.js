/* eslint-disable no-undef */
import Coordinate from '../../../modules/game/config/coordinate.js';
import {GameModes} from '../../../modules/game/config/modes.js';
import Help from '../../../modules/game/help/help.js';
let generateCanvas = require('./gameTemplate.pug');
let generateFinishMenu = require('../multiplayerView/finishGameMenu.pug');
import Game from '../../../modules/game/game.js';
import User from '../../../modules/userModel.js';
import Router from '../../../modules/router.js';
import bus from '../../../modules/bus.js';
import Section from '../baseView.js';



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

	}
	/**
	 * @return {HTMLDivElement | *}
	 */
	render() {
		let avatar = null;
		if (User.getCurUser() !== null) {
			avatar = 'https://rha-backend.herokuapp.com/users/gava';
		} else {
			avatar = '/img/default_player.svg';
		}

		this.wrapper.innerHTML += generateCanvas(
			{
				'width': window.innerWidth * 0.7,
				'height': this.winHeight,
				'id': 'game-canvas',
				'avatar': avatar
			}
		);


		this.parent.appendChild(this.wrapper);
		this.game_canvas = document.getElementById('game-canvas');
		this.ctx = this.game_canvas.getContext('2d');

		this.beforeResize = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		this.game_canvas.style.marginTop = String(100 - 100 * this.game_canvas.height / this.height_canv) / 2 + '%';
		this.wrapper.appendChild(new Help().render());
		const multi_username = document.getElementById('single-username');
		const multi_rating = document.getElementById('single-rating');

		if (!User.isAuthorized()) {
			multi_username.innerText = 'RHA';
			multi_rating.innerText = 'Rating 42';
		} else {
			multi_username.innerText = User.getCurUser().username;
			multi_rating.innerText = 'Rating  ' +  User.getCurUser().rating;
		}

		this.setWindowResizeHandler();
		this.listenOrientation();
		this.setBusListeners();
		this.coordinate = new Coordinate(this.game_canvas);
		this.changeBut = this.wrapper.getElementsByClassName('change')[0];
		this.game = new Game(GameModes.singleplayer, this.game_canvas, this.coordinate, this.changeBut, this.img);
		this.wrapper.getElementsByClassName('exit-button')[0].addEventListener('click', () => {
			// Ws().send({class: 'Break'});
			new Router().open('/');
			bus.emit('close-game', {});
			window.location.reload();
		});
		bus.on('close-help', () => {this.game.start();});
		// this.game.start();

		bus.on('gameover', () => {
			bus.emit('FinishSingleResult', 'gameover');
			this.game.destroy();
			// history.go('/singleplayer');
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
		return [window.innerWidth * 0.7, window.innerWidth * 0.5625 ];
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
			// this.ctx.drawImage(this.img, 0, 0, this.game_canvas.width, this.game_canvas.height);
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

			bus.emit('resize-for-draw', {});
		});
		return this;
	}
	setBusListeners() {
		bus.on('FinishSingleResult', (data) => {
			const result = data.payload;
			this.finishGameMenu = generateFinishMenu({
				result: result,
				text1: 'Again',
				text2: 'Close'
			});
			this.wrapper.innerHTML += this.finishGameMenu;
			document.getElementById('close_multiplayer').addEventListener('click', () => {
				bus.emit('CloseSingleGame');
			});
			document.getElementById('one_more_game').addEventListener('click', () => {
				bus.emit('OneMoreSingle');
			});
		});

		bus.on('CloseSingleGame', () => {
			this.wrapper.children[this.wrapper.children.length - 1].remove();
			new Router().open('/');
			window.location.reload();
		});

		bus.on('OneMoreSingle', () => {
			window.location.reload();
		});
	}
}



//todo инструкция
//todo синглплеер ~ треня
//todo графоний


// интерфейс по красоте, установить другой фон
// реализовать логику выбора юнитов(их кол-во для атаки)
// анимации
