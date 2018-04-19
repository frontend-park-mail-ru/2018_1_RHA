


const amountofCoorX = 1000;
const amountofCoorY = 610;

export default class Coordinate {
	constructor(game_canvas) {
		if (Coordinate.__instance) {
			return Coordinate.__instance;
		}
		Coordinate.__instance = this;
		this.game_canvas = game_canvas;
		this.xSize = game_canvas.width / amountofCoorX;
		this.ySize = game_canvas.height / amountofCoorY;

		this.lengthSide = 90;
		this.allowedCoord = [
			{
				name: 'A',
				x: this.xSize * 365,
				y: 345 * this.ySize,
				allowed: true,
				neighbour: ['B', 'C', 'D']
			},
			{
				name: 'B',
				x: (321 + this.lengthSide * 2) * this.xSize,
				y: (345 - this.lengthSide * 0.86) * this.ySize,
				allowed: true,
				neighbour: ['A', 'C', 'D', 'E']
			},
			{
				name: 'C',
				x: 1000 * this.xSize,
				y: 1000.6 * this.ySize,
				allowed: true,
				neighbour: ['A', 'B', 'E']
			},
			{
				name: 'D',
				x: 1000 * this.xSize,
				y: 1000.8 * this.ySize,
				allowed: true,
				neighbour: ['A', 'B']
			},
			{
				name: 'E',
				x: 1000 * this.xSize,
				y: 1000 * this.ySize,
				allowed: true,
				neighbour: ['B', 'C']
			}
		];
	}

	reSize(game_canvas) {
		this.xSize = game_canvas.width / amountofCoorX;
		this.ySize = game_canvas.height / amountofCoorY;
		//TODO сделать по-человечески
		this.allowedCoord = [
			{
				name: 'A',
				x: this.xSize * 365,
				y: 345 * this.ySize,
				allowed: true,
				neighbour: ['B', 'C', 'D']
			},
			{
				name: 'B',
				x: (321 + this.lengthSide * 2) * this.xSize,
				y: (345 - this.lengthSide * 0.86) * this.ySize,
				allowed: true,
				neighbour: ['A', 'C', 'D', 'E']
			},
			{
				name: 'C',
				x: 1000 * this.xSize,
				y: 1000.6 * this.ySize,
				allowed: true,
				neighbour: ['A', 'B', 'E']
			},
			{
				name: 'D',
				x: 1000 * this.xSize,
				y: 1000.8 * this.ySize,
				allowed: true,
				neighbour: ['A', 'B']
			},
			{
				name: 'E',
				x: 1000 * this.xSize,
				y: 1000 * this.ySize,
				allowed: true,
				neighbour: ['B', 'C']
			}
		];
	}

	getC() {
		console.log(this.xSize, ' get  ', this.ySize);
		return [this.xSize, this.ySize];
	}

}