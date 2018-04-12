// const CACHE_NAME = 'rha-cache-v1';
//
// const cacheUrls = [
// 	'/',
// 	'/register',
// 	'/profile',
// 	'/rating',
// 	'/login',
// 	'/singleplayer',
// 	'/css/a_button.css',
// 	'/css/main.css',
// 	'/css/reset.css',
// 	'/js/components/blocks/block.js',
// 	'/js/components/blocks/button.js',
//
// 	'/js/components/blocks/input.css',
//
// 	'/js/components/blocks/input.js',
//
// 	'/js/components/forms/loadPictureForm/loadPictureForm.css',
//
// 	'/js/components/forms/loadPictureForm/loadPictureForm.js',
// 	'/js/components/forms/changeForm.js',
// 	'/js/components/forms/form.js',
// 	'/js/components/forms/loginForm.js',
// 	'/js/components/forms/registerForm.js',
//
// 	'/js/components/radar/radar.css',
//
// 	'/js/components/radar/radar.js',
// 	'/js/components/render/render.js',
// 	'/js/components/views/gameView/gameTemplate.js',
// 	'/js/components/views/gameView/gameTemplate.pug',
// 	'/js/components/views/gameView/gameView.js',
// 	'/js/components/views/loginView/loginView.js',
//
// 	'/js/components/views/menuView/menu.css',
//
// 	'/js/components/views/menuView/menu.pug',
// 	'/js/components/views/menuView/menuTemplate.js',
// 	'/js/components/views/menuView/menuView.js',
//
// 	'/js/components/views/profileView/profile.css',
//
// 	'/js/components/views/profileView/profile.pug',
// 	'/js/components/views/profileView/profileTemplate.js',
// 	'/js/components/views/profileView/profileView.js',
//
// 	'/js/components/views/ratingView/rating.css',
//
// 	'/js/components/views/ratingView/rating.pug',
// 	'/js/components/views/ratingView/ratingTemplate.js',
// 	'/js/components/views/ratingView/ratingView.js',
// 	'/js/components/views/baseView.js',
// 	'/js/components/views/registerView.js',
// 	'/js/conf/route.js',
// 	'/js/modules/game/components/region.js',
// 	'/js/modules/game/config/allowedCoordinates.js',
// 	'/js/modules/game/config/playerStates.js',
// 	'/js/modules/game/math/getRandom.js',
// 	'/js/modules/game/math/inCircle.js',
// 	'/js/modules/game/math/inHex.js',
// 	'/js/modules/game/player/botPlayer.js',
// 	'/js/modules/game/player/mainPlayer.js',
// 	'/js/modules/game/player/player.js',
// 	'/js/modules/game/player/webPlayer.js',
// 	'/js/modules/game/controller.js',
// 	'/js/modules/game/game.js',
// 	'/js/modules/game/gameManager.js',
// 	'/js/modules/game/gameScene.js',
// 	'/js/modules/graphics/circle.js',
// 	'/js/modules/graphics/figure.js',
// 	'/js/modules/graphics/hexagon.js',
// 	'/js/modules/graphics/switcher.js',
// 	'/js/modules/add-sw.js',
// 	'/js/modules/bus.js',
// 	'/js/modules/http.js',
// 	'/js/modules/router.js',
// 	'/js/modules/sectionSwitcher.js',
// 	'/js/modules/sketch.js',
// 	'/js/modules/userController.js',
// 	'/js/modules/userModel.js',
// 	'/js/modules/validator.js',
// 	'/js/application.js',
// 	'/default.jpg',
// 	'/favicon.ico',
// 	'/index.html',
// 	'/sw.js'
// ];
//
// this.addEventListener('install', (evt) => {
// 	evt.waitUntil(
// 		caches
// 			.open(CACHE_NAME)
// 			.then((cache) => cache.addAll(cacheUrls))
// 			.catch((err) => console.log('Cache error!!!'))
// 	);
// });
//
// this.addEventListener('fetch', (evt) => {
// 	debugger;
// 	if (navigator.onLine) {
// 		return fetch(evt.request);
// 	}
//
// 	evt.respondWith(
// 		caches
// 			.match(evt.request)
// 			.then((cachedResponse) => {
// 				if (cachedResponse) {
// 					return cachedResponse;
// 				} else {
// 					return fetch(evt.request);
// 				}
// 			})
// 			.catch((err) => console.log('unable to fetch resource ', evt.request.url))
// 	);
// });