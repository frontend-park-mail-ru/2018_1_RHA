export const animate = (draw, duration) => {
	const start = performance.now();
	requestAnimationFrame(function animate(time) {
		let timePassed = time - start;
		if (timePassed > duration) timePassed = duration;
		draw(timePassed);
		if (timePassed < duration) {
			requestAnimationFrame(animate);
		}
	});
};