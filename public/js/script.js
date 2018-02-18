const open_modal = document.getElementById('openModal');
const close_modal = document.getElementById('close');
const play = document.getElementById('play');

const login_form = document.getElementById('login_form');
const reg_form = document.getElementById('reg_form');

const video = document.getElementsByTagName('video')[0];
const mute_obj = document.getElementById('mute');

const log_butt = document.getElementById('log_butt');
const reg_butt = document.getElementById('reg_butt');

//-----------------------------

const relay = () => {
    open_modal.classList.toggle('hidden');
    play.classList.toggle('hidden');
};

close_modal.addEventListener('click', relay);
play.addEventListener('click', relay);


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

log_butt.addEventListener('click', (event) => {

    login_form.style.display = 'block';
    log_butt.style.display = 'none';

    reg_form.style.display = 'none';
    reg_butt.style.display = 'block';
});

reg_butt.addEventListener('click', (event) => {

    login_form.style.display = 'none';
    log_butt.style.display = 'block';

    reg_form.style.display = 'block';
    reg_butt.style.display = 'none';
});

//------------------------------------

const auth = (username, email, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth', true);
    xhr.withCredentials = true;

    const user = {username, email};
    const body = JSON.stringify(user);

    xhr.setRequestHeader('Content-Type','application/json charset=utf8');

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 300) {
            return callback(xhr, null);
        }

        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    };
    xhr.send(body);
};

login_form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(login_form.elements);
    const email = login_form.elements['email'].value;
    const username = login_form.elements['username'].value;

    auth(username, email, (err, resp) => {
       console.log(err, resp);
    });
});
