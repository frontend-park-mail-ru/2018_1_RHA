import bus from '../../bus.js';

export const timer = (htmlElement) => {
	let sec = parseInt(document.getElementById('timer'));
	if (sec === 0) {
		bus.emit('timer', {});
	} else {
		// TODO возможно тут бяка, но это неточно
		htmlElement.innerHTML = --sec;
		setTimeout(timer, 1000);
	}
};