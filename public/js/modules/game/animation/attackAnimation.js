
export const attackAnimation = (x, y) => {
	const wrapper = document.getElementsByClassName('wrapper')[0];
	const wrapAnim = document.createElement('div');
	wrapAnim.classList.add('attack-animation');
	wrapper.appendChild(wrapAnim);
	wrapAnim.innerHTML = generateAttack(
		{
			'width': window.innerWidth * 0.7,
			'height': window.innerWidth * 0.525 * 0.83,
			'id': 'attack-canvas'
		}
	);
	const canvas = document.getElementById('attack-canvas');
	const ctx = canvas.getContext('2d');
	ctx.fillRect(x , y , 50 , 50);
	ctx.fillStyle = 'orange';
	ctx.fill();
};
//TODO допилить анимацию