/**
 * Hardcode of regions
 * @type {*[]}
 */



const allowedCoordinates = [
	{
		name: 'A',
		// x: new Coordinate().getC()[0] * 500,
		// y: 500 * new Coordinate().getC()[1],
		// allowed: true,
		neighbour: ['B', 'C', 'D']
	},
	{
		name: 'B',
		// x: 650 * new Coordinate().getC()[0],
		// y: 413.4 * new Coordinate().getC()[1],
		allowed: true,
		neighbour: ['A', 'C', 'D', 'E']
	},
	{
		name: 'C',
		// x: 650 * new Coordinate().getC()[0],
		// y: 586.6 * new Coordinate().getC()[1],
		allowed: true,
		neighbour: ['A', 'B', 'E']
	},
	{
		name: 'D',
		// x: 500 * new Coordinate().getC()[0],
		// y: 326.8 * new Coordinate().getC()[1],
		allowed: true,
		neighbour: ['A', 'B']
	},
	{
		name: 'E',
		// x: 800 * new Coordinate().getC()[0],
		// y: 500 * new Coordinate().getC()[1],
		allowed: true,
		neighbour: ['B', 'C']
	}
];

export default allowedCoordinates;