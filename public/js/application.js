'use strict';

import ProfileSection from './components/views/profileView/profileView.js';
import RatingSection from './components/views/ratingView/ratingView.js';
import RegisterSection from './components/views/registerView.js';
import LoginSection from './components/views/loginView/loginView.js';
import MenuSection from './components/views/menuView/menuView.js';
import Router from './modules/router.js';
import User from './modules/userModel.js';
import GameSection from './components/views/gameView/gameView.js';

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
			.add('/login', LoginSection)
			.add('/singleplayer', GameSection)
			.start();
	})
	.catch();

