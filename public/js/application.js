'use strict';

import MultiplayerSection from './components/views/multiplayerView/multiplayerView.js';
import RegisterSection from './components/views/registerView/registerView.js';
import ProfileSection from './components/views/profileView/profileView.js';
import RatingSection from './components/views/ratingView/ratingView.js';
import LoginSection from './components/views/loginView/loginView.js';
import MenuSection from './components/views/menuView/menuView.js';
import GameSection from './components/views/gameView/gameView.js';
import User from './modules/userModel.js';
import Router from './modules/router.js';

const root = document.getElementById('application');
const globalRoot = document.getElementById('body');

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('/sw.js', {scope: '/'})
// 		.catch((err) => {
// 			console.log('Service worker error: ' + err);
// 		});
// }

User.auth()
	.then( () => {
		new Router(root, globalRoot)
			.add('/', MenuSection)
			.add('/register', RegisterSection)
			.add('/profile', ProfileSection)
			.add('/rating', RatingSection)
			.add('/multiplayer', MultiplayerSection)
			.add('/training', GameSection)
			.add('/login', LoginSection)
			.start();
	})
	.catch();