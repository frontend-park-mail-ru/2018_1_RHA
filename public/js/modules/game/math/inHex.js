/* eslint-disable no-undef */

/**
 * Answers if the point is in Hexagon
 * @param x
 * @param y
 * @param xp
 * @param yp
 * @return {boolean}
 */
const inHex = (x, y, xp, yp) => {
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

export default inHex;