export const setUsers = (users) => {
	const template = document.getElementsByClassName('game-list')[0];
	for (let i = 0; i < users.length; ++i) {
		const game_li = document.createElement('div');
		game_li.classList.add('game-li');
		template.appendChild(game_li);

		const game_lamp_box = document.createElement('div');
		game_lamp_box.classList.add('game-lamp-box');
		game_li.appendChild(game_lamp_box);

		const red_lamp = document.createElement('div');
		red_lamp.classList.add('red-lamp');
		red_lamp.classList.add('game-lamp');
		red_lamp.setAttribute('id', users[i]);
		game_lamp_box.appendChild(red_lamp);

		const list_name = document.createElement('div');
		list_name.classList.add('list-name');
		list_name.innerText = users[i];
		game_lamp_box.appendChild(list_name);

		const br = document.createElement('br');
		template.appendChild(br);

	}
};