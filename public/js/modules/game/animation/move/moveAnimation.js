import {animate} from '../animate.js';
//TODO вместо крестика должен рисоваться кружок
//TODO неправильно отсчитываются координаты
//TODO нарисовать стрелочку
export const moveAnimation = (x, y, x2, y2) => {

	const wrapper = document.getElementsByClassName('wrapper')[0];
	const wrapAnim = document.createElement('div');
	wrapAnim.classList.add('attack-animation');
	wrapper.appendChild(wrapAnim);
	wrapAnim.innerHTML = generateAttack(
		{
			'width': window.innerWidth * 0.7,
			'height': window.innerWidth * 0.525 * 0.83,
			'id': 'attack-canvas'
		}
	);
	const canvas = document.getElementById('attack-canvas');
	const ctx = canvas.getContext('2d');
	const cw = ctx.canvas.width;
	const ch = ctx.canvas.height;
	const radius = cw * 0.03;
	const startX = (x - radius * Math.sin(Math.PI / 4));
	console.log(x, '  ', startX);
	const startY = (y - radius * Math.sin(Math.PI / 4));
	console.log(y, '    ', startY);
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
		ctx.lineWidth = 10;
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

		ctx.moveTo(x2, y2);
		ctx.lineTo(x2 + (x - x2) * part, y2 + (y - y2) * part);


		ctx.stroke();
		ctx.fill();

		// ctx.arc(600, 100, 50, start, diff/10+start, false);

	}, 1000);
	setTimeout(() => {
		wrapper.removeChild(wrapper.lastChild);
	}, 1000);
};