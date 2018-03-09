// const errmsg = "<h1 style='color: red'>Wrong Confirm</h1>";
//
//
// document.getElementById('signin').children[1].addEventListener('submit', () => {
//     console.log('kaka');
//     nickname = document.getElementById('nickname-up');
//     email = document.getElementById('email-up');
//     password = document.getElementById('password-up');
//
//     obj = {
//         'name' : nickname,
//         'email': email,
//         'password': password
//     };
//
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'localhost:5000/users/create', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(someObj);
//     xhr.onreadystatechange = function(){
//         if (this.readyState === 4) {
//             if (this.status === 200)
//                 console.log(xhr.responseText);
//             else
//                 console.log('request error');
//         }
//     };
// });