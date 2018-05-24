import Player from './player.js';
import bus from '../../bus.js';
import {renderScene} from '../helperFuncs/renderScene.js';
import {attackAnimation} from '../animation/attack/attackAnimation.js';
import {moveAnimation} from '../animation/move/moveAnimation.js';

/**
 * Class representing web player
 */
export default class WebPlayer extends Player {
	/**
	 * creates web player
	 */
	constructor(name, color, canvas,  img) {
		super(name, color, canvas,  img);
		this.listeners();
	}

	listeners() {
		bus.on('ServerStep', data => {
			const move = data.payload;
			let from = null;
			let to = null;
			if (move.type === 'attack') {
				//если длина 3, значит захватили
				if (move.map.length === 3) {
					let flag = 0;
					let toUpdate = [];
					console.log('win');
					for (let i = 0; i < this.allRegions.length; ++i) {
						if (flag === 2)
							break;

						if (this.allRegions[i].coordinate.I === move.map[1].coords.x
							&& this.allRegions[i].coordinate.J === move.map[1].coords.y) {
							to = this.allRegions[i];
							toUpdate.push({num: i, units: move.map[1].units});
						}

						if (this.allRegions[i].coordinate.I === move.map[2].coords.x
							&& this.allRegions[i].coordinate.J === move.map[2].coords.y) {
							from = this.allRegions[i];
							toUpdate.push({num: i, units: move.map[2].units});
						}
					}
					to.setColor(from.getColor());
					to.owner.delRegion(to);
					from.owner.addRegionForWeb(to, from.owner, this.allRegions);
					to.area.setStroke('white');

					attackAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);
					bus.emit('update-regions', {regions: toUpdate});
					renderScene(this.canvas, this.allRegions, this.img);

				} else if (move.map.length === 2) {
					console.log('lose');
					let toUpdate = [];
					let flag = 0;
					for (let i = 0; i < this.allRegions.length; ++i) {
						if (flag === 2)
							break;

						if (this.allRegions[i].coordinate.I === move.map[0].coords.x
							&& this.allRegions[i].coordinate.J === move.map[0].coords.y) {
							to = this.allRegions[i];
							this.allRegions[i].units = move.map[0].units;
							toUpdate.push({num: i, units: move.map[0].units});
						}

						if (this.allRegions[i].coordinate.I === move.map[1].coords.x
							&& this.allRegions[i].coordinate.J === move.map[1].coords.y) {
							from = this.allRegions[i];
							this.allRegions[i].units = move.map[1].units;
							toUpdate.push({num: i, units: move.map[1].units});
						}
					}
					attackAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);
					bus.emit('update-regions', {regions: toUpdate});
				}
			} else if (move.type === 'move') {
				let toUpdate = [];
				let flag = 0;
				for (let i = 0; i < this.allRegions.length; ++i) {
					if (flag === 2)
						break;

					if (this.allRegions[i].coordinate.I === move.map[0].coords.x
						&& this.allRegions[i].coordinate.J === move.map[0].coords.y) {
						to = this.allRegions[i];
						this.allRegions[i].units = move.map[0].units;
						toUpdate.push({num: i, units: move.map[0].units});
					}
					if (this.allRegions[i].coordinate.I === move.map[1].coords.x
						&& this.allRegions[i].coordinate.J === move.map[1].coords.y) {
						from = this.allRegions[i];
						this.allRegions[i].units = move.map[1].units;
						toUpdate.push({num: i, units: move.map[1].units});
					}
				}
				bus.emit('update-regions', {regions: toUpdate});
				moveAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);
			}
		});
	}
}

//todo map[1] - тот на кого напали
//todo map[2] -тот кто напал
//todo map[0] - куда отступили войска того, на кого напали
//todo если в массиве элемента 2, а не 3, то проигрыш
//todo cообщения отсылаются теперь в другом формате, посмотри в геймсцене как мы отправляем сообщения на бэк
//todo насколько я понял координата j это х, i - y, а не наоборот, но только в этом случае. Когда отправляли сообщение из сцены, там почему то наоборот и норм

//todo тебе необходимо обновить кол-во юнитов у регонов, также по аналогии необходимо сделать перемещение юнитов
