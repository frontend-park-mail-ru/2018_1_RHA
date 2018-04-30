import {animate} from '../animate.js';

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
	let beginAngle = 0;
	animate(() => {
		ctx.clearRect(0, 0, cw, ch);
		ctx.lineWidth = 10;
		ctx.arc(x, y, radius, beginAngle, (beginAngle + 0.1)*Math.PI);
		beginAngle += 0.1;
	}, 1000);
	setTimeout(() => {
		wrapper.removeChild(wrapper.lastChild);
	}, 1000);
};