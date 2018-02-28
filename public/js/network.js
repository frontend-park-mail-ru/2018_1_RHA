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

