const menu = document.getElementById('menu');
const loginButton = document.getElementById('log_butt');
const registerButton = document.getElementById('reg_butt');
const open_modal = document.getElementById('openModal');
const close_modal = document.getElementById('close');
const login_form = document.getElementById('login_form');
const reg_form = document.getElementById('reg_form');

let toHideOnClose = null;

loginButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    open_modal.classList.toggle('hidden');
    login_form.style.display = 'block';
    toHideOnClose = login_form;
});

registerButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    open_modal.classList.toggle('hidden');
    reg_form.style.display = 'block';
    toHideOnClose = reg_form;
});

close_modal.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    open_modal.classList.toggle('hidden');
    toHideOnClose.style.display = 'none';
});