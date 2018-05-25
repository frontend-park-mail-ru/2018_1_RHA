//const CACHE_NAME = 'rha-cache-v1';


const CACHE_NAME = 'app_sw_v3';
const cacheList = [
	'/',
	'/register',
	'/profile',
	'/rating',
	'/login',
	'/singleplayer',
	'/default.jpg',
	'/map.png'
];

this.addEventListener('install', (event) =>
{
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) =>
			{
				return cache.addAll(cacheList);
			})
	);
});

this.addEventListener('fetch', (event) =>
{
	event.respondWith(
		caches.match(event.request)
			.then(
				response => {
					if (response) {
						return response;
					}

					let fetchRequest = event.request.clone();

					return fetch(fetchRequest)
						.then(
							response => {
								if (!response || response.status !== 200
								|| response.type !== 'basic') {
									return response;
								}

								let responseToCache = response.clone();

								caches.open(CACHE_NAME)
									.then(
										cache => {
											cache.put(event.request, responseToCache);
										}
									);
								return response;
							}
						);
				}
			)
	);
});


