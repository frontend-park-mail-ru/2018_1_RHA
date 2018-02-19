// const getCookie = (name) => {
//     let matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// };
//
// login_form.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     const fields = ['email', 'password'];
//
//     const form = evt.currentTarget;
//     const formElements = form.elements;
//
//     const formdata = fields.reduce(function (allfields, fieldname) {
//         allfields[fieldname] = formElements[fieldname].value;
//         return allfields;
//     }, {});
//
//     console.info('Авторизация пользователя', formdata);
//
//     loginUser(formdata, function (err, response) {
//         if (err) {
//             signupForm.reset();
//             alert('Неверно!');
//             return;
//         }
//
//         checkAuth();
//         openSection('menu');
//     })
// });
//
//
// reg_form.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     const fields = ['email', 'password', 'password_repeat', 'age'];
//
//     const form = evt.currentTarget;
//     const formElements = form.elements;
//
//     const formdata = fields.reduce(function (allfields, fieldname) {
//         allfields[fieldname] = formElements[fieldname].value;
//         return allfields;
//     }, {});
//
//     console.info('Регистрация пользователя', formdata);
//
//     signupUser(formdata, function (err, response) {
//         if (err) {
//             signupForm.reset();
//             alert('Неверно!');
//             return;
//         }
//
//         checkAuth();
//         openSection('menu');
//     });
// });

const errmsg = "<h1 style='color: red'>Wrong Confirm</h1>";



reg_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const lines = event.target.getElementsByTagName('input');
    const password = lines[2]['value'];
    const confirm = lines[3]['value'];
    if (confirm !== password) {
        event.target.innerHTML += errmsg;
        setTimeout(() => {
            event.target.getElementsByTagName('h1')[0].remove();
        }, 3000);
        reg_form.reset();
        return;
    }
    const username = lines[0]['value'];
    const email = lines[1]['value'];

    const newUser = {username: username, email: email, password: password};
});

login_form.addEventListener('submit', (event) => {
   const lines = event.target.getElementsByTagName('input');
   const username = lines[0]['value'];
   const email = lines[1]['value'];

   const user = {username: username, email: email};

   let result = sender('POST', user, '/login');
});

// sender должен вернуть статус запроса, если возникла ошибка, её надо вывести на экран
// например, сервер недоступен, ошибка доступа и тд
const sender = (method, obj, path) => {
    return new Promise( (resolve, reject) => {
        xhr = new XMLHttpRequest();
        xhr.open(method, path, true);

        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        xhr.onreadystatechange = (event) => {
            if (this.readyState === 4 && this.status < 300) {
                resolve(this.response);
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network Error"));
        };

        xhr.send(JSON.stringify(obj));
    });
};

let promise = new Promise(sender);
throw promise.then(result => console.log(result), error => console.log(error));
