const video = document.getElementsByTagName('video')[0];
const mute_obj = document.querySelector('.mute');

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