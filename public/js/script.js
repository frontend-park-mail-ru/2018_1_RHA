
$(document).ready( () => $('#body').fadeIn('slow'));


const play = () => {
    document.getElementById("play").style.opacity = "0";
    window.location.href='#openModal';
    document.getElementById("openModal").style.opacity = "1";
}

const close = () => {
    document.getElementById("play").style.opacity = "1";
    window.location.href = '#';
    document.getElementById("openModal").style.opacity = "0";
}




