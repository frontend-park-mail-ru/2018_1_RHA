
export const battleCalc = (firstRegion, secondRegion) => {
	//todo КАКИЕ ТО ПРОЦЕНТЫ АААА
	const result = firstRegion.gameData.units - secondRegion.gameData.units * 2;
	if (result > 0) {
		firstRegion.gameData.units -= secondRegion.gameData.units * 2;
		secondRegion.gameData.units = 0;
		return true;
	} else {
		secondRegion.gameData.units -= firstRegion.gameData.units / 2;
		firstRegion.gameData.units = 0;
		return false;
	}
};