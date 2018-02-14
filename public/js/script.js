// event handler for switch
const relay = () => {
    document.getElementById("openModal").classList.toggle('hidden');
    document.getElementById("play").classList.toggle('hidden');
};

document.getElementById("close").addEventListener('click', relay);
document.getElementById("play").addEventListener('click', relay);

//--------------------------


const mute = () => {
    let video = document.getElementsByTagName('video')[0];
    if( video.muted === true ){
        video.muted = '';
        document.getElementById('mute').innerHTML = 'Sound OFF';
    }
    else {
       video.muted = 'muted';
       document.getElementById('mute').innerHTML = 'Sound ON';
    }

};

document.getElementById("mute").addEventListener('click', mute);

//--------------------------


const switch_log = () => {
    document.getElementById('login_form').style.display = 'block';
    document.getElementById('reg_form').style.display = 'none';
};

const switch_reg = () => {
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('reg_form').style.display = 'block';
};

