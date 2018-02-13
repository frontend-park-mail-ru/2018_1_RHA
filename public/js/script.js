// event handler for play
const play = () => {
    document.getElementById("play").style.opacity = 0;
    document.getElementById("openModal").style.opacity = 1;
    window.location.href = '#openModal';
};

// event listener for play
document.getElementById("play").addEventListener('click', play);



// event handler for close
const close = () => {
    document.getElementById("play").style.opacity = 1;
    document.getElementById("openModal").style.opacity = 0;
    window.location.href = '#';
};

// event listener for close
document.getElementById("close").addEventListener('click', close);


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

