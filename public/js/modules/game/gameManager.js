import bus from '../bus.js';


//todo: подписываемся на события связанные с действиями в игре
export default class GameManager {
	constructor() {
		bus.on('select-region', data => {
			console.log("im here");
			const region = data.payload;
			region.selected = true;
			region.figure.reDraw('red', 3);
		});

		bus.on('change-selection', data => {
			const regions = data.payload;
			regions.active.selected = false;
			regions.new.selected = true;
			regions.new.figure.reDraw('red', 3);
			regions.active.figure.reDraw('black', 3);
		});
	}

	// setBacklightOfRegion(region) {
	// 	if (region.selected === true) {
	// 		region.figure.reDraw('red', 3);
	// 	}
	// 	else {
	// 		region.figure.reDraw('black', 3);
	// 	}
	// }
}