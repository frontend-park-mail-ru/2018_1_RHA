const generateLoader = require('./loader.pug');
const body = document.getElementById('body');
export default class Loader {

	static animateLoader() {
		const divAnim = document.createElement('div');
		divAnim.classList.add('wrapLoad');
		divAnim.innerHTML =  generateLoader();
		body.appendChild(divAnim);
	}
	static deleteLoader(){
		const elem = body.getElementsByClassName('wrapLoad')[0];
		body.removeChild(elem);
	}
}

