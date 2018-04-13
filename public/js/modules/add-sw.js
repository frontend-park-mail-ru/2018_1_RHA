/**
 * registers service worker
 */
const swloader = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('../../sw.js', {scope: '/'})
			.catch((err) => {console.log('Service worker error: ' + err);});
	}
};

