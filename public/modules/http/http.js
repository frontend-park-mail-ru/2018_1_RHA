export default class HTTP {
    static send(sendObject, path, method, callback) {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open(method, path, true);
        const body = JSON.stringify(sendObject);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4)
                return;
            if (xhr.status >= 300)
                return callback(xhr, null);
            const respone = JSON.parse(xhr.responseText);
            callback(null, respone);
        };
        xhr.send(body);
    }
}
