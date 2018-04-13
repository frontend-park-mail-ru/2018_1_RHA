/**
 * Answers if the point is in Circle
 * @param xС
 * @param yС
 * @param r
 * @param xP
 * @param yP
 * @return {boolean}
 */
const inCircle = (xС, yС, r, xP, yP) => {
	return ((xP - xС) * (xP - xС) + (yP - yС) * (yP - yС) <= r * r );
};

export default inCircle;