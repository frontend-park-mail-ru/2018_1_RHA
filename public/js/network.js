"use strict";


function sendForm() {
   // const formData = new FormData(form);
    let object = {
        name: document.getElementById('nickname-up').value,
        email: document.getElementById('email-up').value,
        password: document.getElementById('password-up').value
    };
    // formData.forEach((value, key) => {
    //     object[key] = value;
    // });
    const json = JSON.stringify(object);
    console.log(json);
    const xhr = new XMLHttpRequest();
    //xhr.open("POST", form.action, true);
    xhr.open("POST", "https://rha-backend.herokuapp.com/users/create", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.withCredentials = true;
    xhr.send(json);
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

function auth(nickname, password, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://rha-backend.herokuapp.com/users/auth', true);
    xhr.withCredentials = true;
    const user = {nickname, password};
    const body = JSON.stringify(user);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (+xhr.status !== 200) {
            return callback(xhr, null);
        }
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
        const cookie = document.cookie;
        console.log(cookie['user']);
    };

    xhr.send(body);
}



