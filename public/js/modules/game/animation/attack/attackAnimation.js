import {animate} from '../animate.js';
let generateAttack = require('./attackAnimation.pug');


export const attackAnimation = (x, y, x2, y2) => {
	const wrapper = document.getElementsByClassName('wrapper')[0];
	const wrapAnim = document.createElement('div');
	wrapAnim.classList.add('attack-animation');
	wrapper.appendChild(wrapAnim);
	wrapAnim.innerHTML = generateAttack(
		{
			'width': window.innerWidth * 0.7,
			'height': window.innerHeight,
			'id': 'attack-canvas'
		}
	);
	const canvas = document.getElementById('attack-canvas');
	const ctx = canvas.getContext('2d');
	const cw = ctx.canvas.width;
	const ch = window.innerHeight;
	let result;
	try {
		const game_canvas = document.getElementById('game-canvas');
		result = window.getComputedStyle(game_canvas).marginTop.match(/^[0-9]+/);
	} catch (error) {
		const game_canvas = document.getElementById('multiplayer-canvas');
		result = window.getComputedStyle(game_canvas).marginTop.match(/^[0-9]+/);
	}

	let mTop = Number(result);
	y = y + mTop;
	y2 = y2 + mTop;
	const radius = cw * 0.03;
	const lWidth = cw * 0.01;
	const startX = (x - radius * Math.sin(Math.PI / 4));
	const startY = (y - radius * Math.sin(Math.PI / 4));
	const endX = (x + radius * Math.sin(Math.PI / 4));
	const endY = (y + radius * Math.sin(Math.PI / 4));
	let diff;
	let part;
	const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
	const gradientStroke = ctx.createLinearGradient(startX, startY, endX, endY);

	animate(timePassed => {
		diff = (timePassed).toFixed(2);
		part = diff / 1000;
		ctx.clearRect(0, 0, cw, ch);
		ctx.lineWidth = lWidth;
		gradient.addColorStop(0, '#030101');
		gradient.addColorStop(0.5, '#711615');
		gradient.addColorStop(1, '#ee2357');

		gradientStroke.addColorStop(0, '#030101');
		gradientStroke.addColorStop(0.5, '#0d3634');
		gradientStroke.addColorStop(1, '#ee2357');


		ctx.fillStyle = gradient;
		ctx.strokeStyle = gradientStroke;
		const secondX = 2 * radius * Math.sin(Math.PI / 4) + startX;
		if ( diff/10 + startX >= secondX) {
			diff = 100;
		}

		ctx.moveTo(startX, startY);
		ctx.lineTo(diff/10 + startX, diff/10 + startY);
		ctx.moveTo(secondX, startY);
		ctx.lineTo(secondX - diff/10, diff/10 + startY);

		ctx.moveTo(x2, y2);
		ctx.lineTo(x2 + (x - x2) * part, y2 + (y - y2) * part);


		ctx.stroke();
		ctx.fill();

	}, 1000);
	setTimeout(() => {
		wrapper.removeChild(wrapper.lastChild);
	}, 1000);

};



