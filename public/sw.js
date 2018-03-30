const CACHE_NAME = 'sampe_sw-v1';
const URLS = ['/', '/rating', '/register', '/profile', '/login', '/menu', '/lending'];
const DATA = [
    '/',
    '/img/lion.jpg',
    '/js/components/blocks/link/link.js',
    '/js/components/blocks/link/linkTemplate.js',
    '/js/components/blocks/block.js',
    '/js/components/blocks/button.js',
    '/js/components/blocks/input.js',
    '/js/components/forms/changeForm.js',
    '/js/components/forms/form.js',
    '/js/components/forms/loginForm.js',
    '/js/components/forms/registerForm.js',
    '/js/components/render/render.js',
    '/js/components/views/modalView/modalView.js',
    '/js/components/views/modalView/modalTemplate.js',
    '/js/components/views/playView/playView.js',
    '/js/components/views/play/playTemplate.js',
    '/js/components/views/profileView/profileView.js',
    '/js/components/views/ratingView/ratingView.js/',
    '/js/components/views/ratingView/ratingTemplate.js',
    '/js/components/views/baseView.js',
    '/js/components/views/loginView.js',
    '/js/components/views/menuView.js',
    '/js/components/views/registerView.js',
    '/js/conf/route.js',
    '/js/modules/add-sw.js',
    '/js/modules/bus.js',
    '/js/modules/http.js',
    '/js/modules/router.js',
    '/js/modules/sectionSwitcher.js',
    '/js/modules/userController.js',
    '/js/modules/userModel.js',
    '/js/modules/validator.js',
];

const ALL_DATA = [];
URLS.forEach(temp => {
    DATA.forEach(url => {
        ALL_DATA.forEach(temp + url);
    })
});

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(ALL_DATA))
    );
});

// При запросе на сервер мы используем данные из кэша и только после идем на сервер.
self.addEventListener('fetch', (event) => {
    // Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
    event.respondWith(fromCache(event.request));
    event.waitUntil(
        update(event.request)
        // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
            .then(refresh)
    );
});

function fromCache(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response.clone()).then(() => response)
        )
    );
}

// Шлём сообщения об обновлении данных всем клиентам.
function refresh(response) {
    return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            // Подробнее про ETag можно прочитать тут
            // https://en.wikipedia.org/wiki/HTTP_ETag
            const message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            };
            // Уведомляем клиент об обновлении данных.
            client.postMessage(JSON.stringify(message));
        });
    });
}