const playButton=document.getElementById('play');
const registerButton = document.getElementById('reg_butt');
const login_form = document.getElementById('login_form');
const loginButton = document.getElementById('log_butt');
const open_modal = document.getElementById('openModal');
const close_modal = document.getElementById('close');
// let reg_form = document.getElemen('click', () => {
//     menu.style.display = 'none';
//     open_modal.classList.toggle('hidden');
//     login_form.style.display = 'block';
//     toHideOnClose = login_form;
// });tById('reg_form');
const menu = document.querySelector('.menu');

let toHideOnClose = null;

playButton.addEventListener('click', () => {
    playButton.classList.toggle('hidden');
    open_modal.classList.toggle('hidden');
    // toHideOnClose = open_modal;
});


// loginButton.addEventListener('click', () => {
//     menu.style.display = 'none';
//     open_modal.classList.toggle('hidden');
//     login_form.style.display = 'block';
//     toHideOnClose = login_form;
// });
//
// registerButton.addEventListener('click', () => {
//     menu.style.display = 'none';
//     open_modal.classList.toggle('hidden');
//     reg_form.style.display = 'block';
//     toHideOnClose = reg_form;
// });

close_modal.addEventListener('click', () => {
    playButton.classList.toggle('hidden');
    open_modal.classList.toggle('hidden');
    // toHideOnClose.style.display = 'none';
});