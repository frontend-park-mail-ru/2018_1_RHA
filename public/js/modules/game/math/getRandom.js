/**
 * Returns random number between min and max
 * @param min
 * @param max
 * @return {*}
 */
const getRandom = (min, max) => {
	return Math.floor((Math.random() * (max - min))) + min;
};
export default getRandom;