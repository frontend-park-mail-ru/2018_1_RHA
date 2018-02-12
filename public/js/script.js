
$(document).ready( () => $('#body').fadeIn('slow'));


$("#play").click( () => {
    $("#play").fadeOut('slow');
    window.location.href='#openModal';
    document.getElementById("openModal").style.opacity = "1";

});

$("#close").click( () => {
    $("#play").fadeIn('slow');
    window.location.href='#';
    document.getElementById("openModal").style.opacity = "0";
});


