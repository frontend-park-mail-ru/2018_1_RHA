/* eslint-disable indent */


export const aboutRegion = (curRegion) => {
	const type = document.getElementById('type');
	const units = document.getElementById('units');
	let typeReg = null;
	switch (curRegion.type) {
		case 1:
			typeReg = 'Grass';
			break;
		case 2:
			typeReg = 'Sand';
			break;
		case 3:
			typeReg = 'Forest';
			break;
		case 4:
			typeReg = 'Grass hill';
			break;
		case 5:
			typeReg = 'Sand hill';
			break;
		case 6:
			typeReg = 'Forest hill';
			break;
		case 7:
			typeReg = 'Mount';
			break;
		case 8:
			typeReg = 'City';
			break;

	}
	type.innerText = typeReg;
	units.innerText = curRegion.gameData.units;
};
