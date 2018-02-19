const video = document.getElementsByTagName('video')[0];
const mute_obj = document.getElementById('mute');

// play.addEventListener('click', relay);


mute_obj.addEventListener('click', (event) => {
    if( video.muted === true ){
        mute_obj.innerHTML = 'Sound ON';
        video.muted = '';
    }
    else {
        mute_obj.innerHTML = 'Sound OFF';
        video.muted = 'muted';
    }
});
//------------------------------------
//
// const auth = (username, email, callback) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', '/auth', true);
//     xhr.withCredentials = true;
//
//     const user = {username, email};
//     const body = JSON.stringify(user);
//
//     xhr.setRequestHeader('Content-Type','application/json charset=utf8');
//
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState !== 4) return;
//         if (xhr.status >= 300) {
//             return callback(xhr, null);
//         }
//
//         const response = JSON.parse(xhr.responseText);
//         callback(null, response);
//     };
//     xhr.send(body);
// };
//
// login_form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     console.log(login_form.elements);
//     const email = login_form.elements['email'].value;
//     const username = login_form.elements['username'].value;
//
//     auth(username, email, (err, resp) => {
//        console.log(err, resp);
//     });
// });
