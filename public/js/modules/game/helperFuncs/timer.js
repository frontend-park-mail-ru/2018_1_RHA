import bus from '../../bus.js';

export const timer = (htmlElement) => {
	let sec = 30;
	let g = setInterval(() => {
		htmlElement.innerHTML = --sec;
		if (sec === 0) {
			clearInterval(g);
			bus.emit('left-click-change', {});
		}
	}, 1000);
};