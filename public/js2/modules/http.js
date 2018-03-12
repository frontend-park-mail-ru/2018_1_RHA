import config from '../config/config.js';

class HttpService {
    static get(url) {
        return this.__request('GET', url, undefined);
    }

    static post(url, body) {
        return this.__request('POST', url, body);
    }

    static delete(url) {
        return this.__request('DELETE', url, undefined);
    }

    static __request(requestMethod, url, body) {
        const headers = new Headers();

        if (requestMethod ==='POST') {
            headers.append('Content-Type', 'application/json; charset=utf-8');
        }

        const req = new Request(`${config.serverUrl}${url}`, {
            method: requestMethod,
            body: body,
            headers: headers,
            credentials: 'include',
            mode: 'cors'
        });
        return fetch(req);
    }
}

export default HttpService;