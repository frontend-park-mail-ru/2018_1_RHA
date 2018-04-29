import bus from '../../bus.js';

export const timer = (htmlElement) => {
	let sec = 30;
	let isPaused = false;
	let g = setInterval(() => {
		if (isPaused) {
			setTimeout(() => {
				htmlElement.innerHTML = --sec;
				if (sec === 0) {
					clearInterval(g);
					bus.emit('left-click-change', {});
				}
			}, 2500);
		}
		htmlElement.innerHTML = --sec;
		if (sec === 0) {
			clearInterval(g);
			bus.emit('left-click-change', {});
		}
	}, 1000);
	bus.on('left-click-change', () => {
		//sec = 0;
		clearInterval(g);
	});
	bus.on('attack', () => {
		isPaused = true;
	});
};