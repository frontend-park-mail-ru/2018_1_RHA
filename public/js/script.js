const open_modal = document.getElementById('openModal');
const close_modal = document.getElementById('close');
const play = document.getElementById('play');

const login_form = document.getElementById('login_form');
const reg_form = document.getElementById('reg_form');

const video = document.getElementsByTagName('video')[0];
const mute_obj = document.getElementById('mute');

//-----------------------------

const relay = () => {
    open_modal.classList.toggle('hidden');
    play.classList.toggle('hidden');
};

close_modal.addEventListener('click', relay);
play.addEventListener('click', relay);


const mute = () => {
    if( video.muted === true ){
        mute_obj.innerHTML = 'Sound ON';
        video.muted = '';
    }
    else {
       mute_obj.innerHTML = 'Sound OFF';
       video.muted = 'muted';
    }
};

document.getElementById("mute").addEventListener('click', mute);


const switch_log = () => {
    login_form.style.display = 'block';
    reg_form.style.display = 'none';
};

const switch_reg = () => {
    login_form.style.display = 'none';
    reg_form.style.display = 'block';
};

