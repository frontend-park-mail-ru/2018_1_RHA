

const CACHE_NAME = 'ship-collision-cache-v1';

const cacheUrls = [
	'/',
	'/register',
	'/profile',
	'/rating',
	'/login',
	'/singleplayer',
	'public/css/a_button.css',
	'public/css/main.css',
	'public/css/reset.css',
	'public/js/components/blocks/block.js',
	'public/js/components/blocks/button.js',

	'public/js/components/blocks/input.css',

	'public/js/components/blocks/input.js',

	'public/js/components/forms/loadPictureForm/loadPictureForm.css',

	'public/js/components/forms/loadPictureForm/loadPictureForm.js',
	'public/js/components/forms/changeForm.js',
	'public/js/components/forms/form.js',
	'public/js/components/forms/loginForm.js',
	'public/js/components/forms/registerForm.js',

	'public/js/components/radar/radar.css',

	'public/js/components/radar/radar.js',
	'public/js/components/render/render.js',
	'public/js/components/views/gameView/gameTemplate.js',
	'public/js/components/views/gameView/gameTemplate.pug',
	'public/js/components/views/gameView/gameView.js',
	'public/js/components/views/loginView/loginView.js',

	'public/js/components/views/menuView/menu.css',

	'public/js/components/views/menuView/menu.pug',
	'public/js/components/views/menuView/menuTemplate.js',
	'public/js/components/views/menuView/menuView.js',

	'public/js/components/views/profileView/profile.css',

	'public/js/components/views/profileView/profile.pug',
	'public/js/components/views/profileView/profileTemplate.js',
	'public/js/components/views/profileView/profileView.js',

	'public/js/components/views/ratingView/rating.css',

	'public/js/components/views/ratingView/rating.pug',
	'public/js/components/views/ratingView/ratingTemplate.js',
	'public/js/components/views/ratingView/ratingView.js',
	'public/js/components/views/baseView.js',
	'public/js/components/views/registerView.js',
	'public/js/conf/route.js',
	'public/js/modules/game/components/region.js',
	'public/js/modules/game/config/allowedCoordinates.js',
	'public/js/modules/game/config/playerStates.js',
	'public/js/modules/game/math/getRandom.js',
	'public/js/modules/game/math/inCircle.js',
	'public/js/modules/game/math/inHex.js',
	'public/js/modules/game/player/botPlayer.js',
	'public/js/modules/game/player/mainPlayer.js',
	'public/js/modules/game/player/player.js',
	'public/js/modules/game/player/webPlayer.js',
	'public/js/modules/game/controller.js',
	'public/js/modules/game/game.js',
	'public/js/modules/game/gameManager.js',
	'public/js/modules/game/gameScene.js',
	'public/js/modules/graphics/circle.js',
	'public/js/modules/graphics/figure.js',
	'public/js/modules/graphics/hexagon.js',
	'public/js/modules/graphics/switcher.js',
	'public/js/modules/add-sw.js',
	'public/js/modules/bus.js',
	'public/js/modules/http.js',
	'public/js/modules/router.js',
	'public/js/modules/sectionSwitcher.js',
	'public/js/modules/sketch.js',
	'public/js/modules/userController.js',
	'public/js/modules/userModel.js',
	'public/js/modules/validator.js',
	'public/js/application.js',
	'public/default.jpg',
	'public/favicon.ico',
	'public/index.html',
	'public/sw.js'
];

this.addEventListener('install', (evt) => {
	evt.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(cacheUrls))
			.catch((err) => console.log('Cache error!!!'))
	);
});

this.addEventListener('fetch', (evt) => {
	if (navigator.onLine) {
		return fetch(evt.request);
	}

	evt.respondWith(
		caches
			.match(evt.request)
			.then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse;
				} else {
					return fetch(evt.request);
				}
			})
			.catch((err) => console.log('unable to fetch resource ', evt.request.url))
	);
});