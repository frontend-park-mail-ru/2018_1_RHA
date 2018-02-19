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
});