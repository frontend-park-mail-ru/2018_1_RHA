import {animate} from '../animate.js';
export const moveAnimation = (x, y, x2, y2) => {

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
	const lWidth = cw * 0.01;
	// canvas.style.marginTop = String(100 - 100 * canvas.height /window.innerHeight * 0.83) / 2 + '%';
	const game_canvas = document.getElementById('game-canvas');
	let result = window.getComputedStyle(game_canvas).marginTop.match(/^[0-9]+/);
	let mTop = Number(result);
	y = y + mTop;
	y2 = y2 + mTop;

	const length = (Math.sqrt((x-x2)*(x-x2) + (y-y2)*(y-y2)));
	let curLength;
	let curX;
	let curY;
	let arrowX;
	let arrowY;
	let arrowX2;
	let arrowY2;
	let constX;
	let constY;
	let diff;
	let part;
	const gradient = ctx.createLinearGradient(x2, y2, x, y);
	const gradientStroke = ctx.createLinearGradient(x2, y2, x, y);

	animate(timePassed => {
		diff = (timePassed).toFixed(4);
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

		curX = x2 + (x - x2) * part;
		curY = y2 + (y - y2) * part;
		curLength = Math.sqrt((curX - x2) * (curX - x2) + (curY - y2) * (curY - y2));
		if ( curLength <= 0.76 * length) {
			constX = curX;
			constY = curY;
		}
		if (curLength >= 0.75 * length) {
			arrowX = 0.2*(y - y2) + constX;
			arrowY = 0.2*(x2 - x) + constY;
			arrowX2 = -0.2*(y - y2) + constX;
			arrowY2 = -0.2*(x2 - x) + constY;
			ctx.moveTo(arrowX, arrowY);
			ctx.lineTo(arrowX  + (x - arrowX) * part, arrowY  + (y - arrowY) * part);
			ctx.moveTo(arrowX2, arrowY2);
			ctx.lineTo(arrowX2 + (x - arrowX2) * part, arrowY2  + (y  - arrowY2) * part);
		}

		ctx.moveTo(x2, y2);
		ctx.lineTo(curX, curY);



		ctx.stroke();
		ctx.fill();

		// ctx.arc(600, 100, 50, start, diff/10+start, false);

	}, 1000);
	setTimeout(() => {
		wrapper.removeChild(wrapper.lastChild);
	}, 1000);
};