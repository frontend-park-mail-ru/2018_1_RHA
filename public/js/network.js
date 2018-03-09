"use strict";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function signUp(name, email, password, callback) {
    const user = {name, email, password};
    const body = JSON.stringify(user);
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (+xhr.status !== 200) {
            return callback(xhr, null);
        }
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    };
    //xhr.open("POST", "http://rha-backend.herokuapp.com/users/create", true);
    xhr.open("POST", "http://localhost:5000/users/create", true);
    //xhr.open("POST", "/signup", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(body);
}

function loadAllUsers(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/users", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {

            return;
        }
        if (xhr.status === 200) {
            const responseText = xhr.responseText;
            const response = JSON.parse(responseText);
            callback(null, response);
        }
        else {
            callback(xhr);
        }
    };
    xhr.send();
}


loadAllUsers( function (err, users) {
    if (err) {
        console.error(err);
        return;
    }
    console.dir(users);
});

function auth(name, password, callback) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    //xhr.open('POST', 'http://rha-backend.herokuapp.com/users/auth', true);
    xhr.open('POST', 'http://localhost:5000/users/auth', true);
    //xhr.open('POST', '/login', true);
    const user = {name, password};
    const body = JSON.stringify(user);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (+xhr.status !== 200) {
            return callback(xhr, null);
        }
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    };

    xhr.send(body);
}

function logout(callback) {
    console.log('in logout func');
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    //xhr.open('POST', 'http://rha-backend.herokuapp.com/users/logout', true);
    xhr.open('POST', 'http://localhost:5000/users/logout', true);
    //xhr.open('POST', '/logout', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (+xhr.status !== 200) {
            return callback(xhr, null);
        }
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    };
    xhr.send();
}


