import config from '../conf/route.js';

class HttpService {
    static get(url, callbackfn) {
         return this.__request('GET', url)
            .then (
                response => {
                    if (response.status === 200) {
                        try {
                            callbackfn(null, response.json());
                        }
                        catch (err) {
                            console.error('get error: ', err);
                        }
                    } else {
                        callbackfn(response);
                    }
                }
            )
    }

    static post(url, body, callbackfn) {
        return this.__request('POST', url, body)
            .then (
                response => {
                    if (response.status === 200) {
                        try {
                            callbackfn(null, response.json());
                        }
                        catch (err) {
                            console.error('post error: ', err);
                            callbackfn(err);
                        }

                    } else {
                        callbackfn(response);
                    }

                }
            )
    }


    static __request(requestMethod, url, body) {
        const headers = new Headers();

        if (requestMethod ==='POST') {
            headers.append('Content-Type', 'application/json; charset=utf-8');
        }

        const req = {
          method: requestMethod,
          headers: headers,
          body: body,
          credentials: 'include',
          mode: 'cors'
        };
        return fetch(`${config.serverUrl}${url}`, req);
    }
}

export default HttpService;