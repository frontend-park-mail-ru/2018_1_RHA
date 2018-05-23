import Player from './player.js';
import bus from '../../bus.js';
import MainPlayer from './mainPlayer';
import {renderScene} from '../helperFuncs/renderScene';
import {attackAnimation} from '../animation/attack/attackAnimation';

/**
 * Class representing web player
 */
export default class WebPlayer extends Player {
	/**
	 * creates web player
	 */
	constructor(name, color, canvas,  img) {
		super(name, color, canvas,  img);
		if (WebPlayer.__instance) {
			return WebPlayer.__instance;
		}
		MainPlayer.__instance = this;
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
					console.log('win');
					for (let i = 0; i < this.allRegions.length; ++i) {
						if (this.allRegions[i].coordinate.J === move.map[1].coords.x
							&& this.allRegions[i].coordinate.I === move.map[1].coords.y) {
							to = this.allRegions[i];
						}
						if (this.allRegions[i].coordinate.J === move.map[2].coords.x
							&& this.allRegions[i].coordinate.I === move.map[2].coords.y) {
							from = this.allRegions[i];
						}
					}
					console.log('to  -  ', to);
					console.log('from  -  ', from);
					console.log(to.getColor());
					to.setColor(from.getColor());
					console.log(to.getColor());
					to.owner.delRegion(to);
					from.owner.addRegionForWeb(to, from.owner, this.allRegions);
					to.area.setStroke('white');

					attackAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);
					renderScene(this.canvas, this.allRegions, this.img);

				} else if (move.map.length === 2) {
					for (let i = 0; i < this.allRegions.length; ++i) {
						if (this.allRegions[i].coordinate.J === move.map[0].coords.x
							&& this.allRegions[i].coordinate.I === move.map[0].coords.y) {
							to = this.allRegions[i];
						}
						if (this.allRegions[i].coordinate.J === move.map[1].coords.x
							&& this.allRegions[i].coordinate.I === move.map[1].coords.y) {
							from = this.allRegions[i];
						}
					}
					// console.log('to  -  ', to);
					// console.log('from  -  ', from);
					// console.log(to.getColor());
					// to.setColor(from.getColor());
					// console.log(to.getColor());
					// to.owner.delRegion(to);
					// from.owner.addRegionForWeb(to, from.owner, this.allRegions);
					// to.area.setStroke('white');
					//
					// attackAnimation(to.area.xC, to.area.yC, from.area.xC, from.area.yC);
					// renderScene(this.canvas, this.allRegions, this.img);
				}


			}

		});
	}
}

//todo map[1] - тот на кого напали
//todo map[2] -тот кто напал
//todo map[0] - куда отступили войска того, на кого напали
//todo если элемента 2, то проигрыш
//todo не перекрашиваются хексы
//todo возможно я неправильно получаю на фронте регионы по координатам пришедшим с бэка
//todo cообщения отсылаются теперь в другом формате, посмотри в геймсцене как мы отправляем сообщения на бэк
//todo насколько я понял координата j это х, i - y, а не наоборот


//todo анимацию я сделаю