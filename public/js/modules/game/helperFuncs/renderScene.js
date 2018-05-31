

export  const renderScene = (canvas, regions, img) => {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	regions.forEach((region) => {
		region.renderHex();
	});
};