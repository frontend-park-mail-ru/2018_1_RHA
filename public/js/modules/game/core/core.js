/* eslint-disable no-undef */

let xp = [100, 100, 500]; // Массив X-координат полигона
let yp = [100, 500, 500]; // Массив Y-координат полигона
const inPoly = (x,y) => {
	let npol = xp.length;
	let j = npol - 1;
	let c = false;
	for (let i = 0; i < npol; i++){
		if ((((yp[i]<=y) && (y<yp[j])) || ((yp[j]<=y) && (y<yp[i]))) &&
			(x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) {
			c = !c;
		}
		j = i;
	}
	return c;
};

export default inPoly;