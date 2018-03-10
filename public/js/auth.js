const errmsg = "<h1 style='color: red'>Wrong Confirm</h1>";



// document.querySelectorAll('js-signin-group')[1].addEventListener('submit', (event) => {
//     event.preventDefault();
//     const lines = event.target.getElementsByTagName('input');
//     const password = lines[2]['value'];
//     const confirm = lines[3]['value'];
//     if (confirm !== password) {
//         event.target.innerHTML += errmsg;
//         lines[3].style.border = "solid red";
//         setTimeout(() => {
//             event.target.getElementsByTagName('h1')[0].remove();
//             lines[3].style.removeProperty('border');
//         }, 3000);
//         reg_form.reset();
//         return;
//     }
//     const username = lines[0]['value'];
//     const email = lines[1]['value'];
//
//     const newUser = {username: username, email: email, password: password};
// });

// login_part.addEventListener('submit', (event) => {
//    const lines = event.target.getElementsByTagName('input');
//    const username = lines[0]['value'];
//    const email = lines[1]['value'];
//
//    const user = {username: username, email: email};
//
//    let result = sender('POST', user, '/forms');
// });

// sender должен вернуть статус запроса, если возникла ошибка, её надо вывести на экран
// например, сервер недоступен, ошибка доступа и тд
// const sender = (method, obj, path) => {
//     return new Promise( (resolve, reject) => {
//         xhr = new XMLHttpRequest();
//         xhr.open(method, path, true);
//
//         xhr.withCredentials = true;
//         xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//
//         xhr.onreadystatechange = (event) => {
//             if (this.readyState === 4 && this.status < 300) {
//                 resolve(this.response);
//             } else {
//                 let error = new Error(this.statusText);
//                 error.code = this.status;
//                 reject(error);
//             }
//         };
//
//         xhr.onerror = () => {
//             reject(new Error("Network Error"));
//         };
//
//         xhr.send(JSON.stringify(obj));
//     });
// };

// let promise = new Promise(sender);
// throw promise.then(result => console.log(result), error => console.log(error));


document.getElementById('signin').children[1].addEventListener('submit', () => {
    console.log('kaka');
    nickname = document.getElementById('nickname-up');
    email = document.getElementById('email-up');
    password = document.getElementById('password-up');

    obj = {
        'name' : nickname,
        'email': email,
        'password': password
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'localhost:5000/users/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(someObj);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (this.status === 200)
                console.log(xhr.responseText);
            else
                console.log('request error');
        }
    };
});