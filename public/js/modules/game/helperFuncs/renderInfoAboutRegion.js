

export const aboutRegion = (curRegion, domElem) => {
	domElem.innerText = '';
	domElem.innerText += 'name: ';
	domElem.innerText += curRegion.name;
	domElem.innerText += ' \n';
	domElem.innerText += 'region: ';
	domElem.innerText += curRegion.gameData.units;
};
