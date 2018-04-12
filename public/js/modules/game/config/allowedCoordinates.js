const allowedCoordinates = [
	{
		name: 'A',
		x: 500,
		y: 500,
		allowed: true,
		neighbour: ['B', 'C', 'D']
	},
	{
		name: 'B',
		x: 650,
		y: 413.4,
		allowed: true,
		neighbour: ['A', 'C', 'D', 'E']
	},
	{
		name: 'C',
		x: 650,
		y: 586.6,
		allowed: true,
		neighbour: ['A', 'B', 'E']
	},
	{
		name: 'D',
		x: 500,
		y: 326.8,
		allowed: true,
		neighbour: ['A', 'B']
	},
	{
		name: 'E',
		x: 800,
		y: 500,
		allowed: true,
		neighbour: ['B', 'C']
	}
];

export default allowedCoordinates;