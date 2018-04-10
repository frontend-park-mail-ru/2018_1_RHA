const inCircle = (xС, yС, r, xP, yP) => {
	return ((xP - xС) * (xP - xС) + (yP - yС) * (yP - yС) <= r * r );
};

export default inCircle;