const playButton=document.getElementById('play');
const open_modal = document.getElementById('openModal');
const close_modal = document.getElementById('close');
const signupSection = document.getElementById('signup');
const signinSection = document.getElementById('signin');
const signup_li = document.getElementById('signup-li');
const signin_li = document.getElementById('signin-li');
const mainModPart = document.getElementById('mainModPart');
const signupForm = document.getElementsByClassName('js-signup-group')[0];
const signinForm = document.getElementsByClassName('js-signin-group')[0];
const menu = document.getElementsByClassName('menu')[0];
const lForm = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout');
signupSection.hidden = true;

const sections = {
  signup: signupSection,
  signin: signinSection,
};



playButton.addEventListener('click', () => {
    playButton.classList.toggle('hidden');
    open_modal.classList.toggle('hidden');
    signinSection.hidden = false;
    // toHideOnClose = open_modal;
});

close_modal.addEventListener('click', () => {
    playButton.classList.toggle('hidden');
    open_modal.classList.toggle('hidden');
    signin_li.classList.add('active');
    signup_li.classList.remove('active');
    // toHideOnClose.style.display = 'none';
});

mainModPart.addEventListener('click', (evt) => {
    //debugger;

    const target = evt.target;
    if (target.tagName.toLowerCase() !== 'a') {
        return;
    }
    evt.preventDefault();
    const section = target.getAttribute('data-section');
    console.log(section);
    openSection(section);
    activeButton(section);
});

const openSection = name => {
  Object.keys(sections).forEach((key) => {
      if (key === name) {
          sections[key].hidden = false;
      }
      else {
          sections[key].hidden = true;

      }
  })
};


//active button illumination
const activeButton = section => {
    if (section === 'signin') {
        signin_li.classList.add('active');
        signup_li.classList.remove('active');
    }
    if (section === 'signup') {
        signup_li.classList.add('active');
        signin_li.classList.remove('active');
    }
};

lForm.addEventListener('click',  (event) => {
    console.log('aha');

    event.preventDefault();
    console.log(lForm.elements);
    const nickname = document.getElementById('nickname-in').value;
    const password = document.getElementById('password-in').value;

    auth(nickname, password, function (err, resp) {
        console.log(err,resp);
    })

});


signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(document.cookie);
    sendForm();
    console.log(document.cookie);
});


logoutBtn.addEventListener('click', (event) => {
    console.log('in logbtn');
    event.preventDefault();
    logout();
});

console.log(document.cookie);
if (getCookie('users') !== undefined) {
    console.log(getCookie('users'));
    signinSection.hidden = true;
    signupSection.hidden = true;
    menu.classList.remove('hidden');
}
else {
    console.log('kaka');
    signinSection.hidden = false;
    signupSection.hidden = false;
    menu.classList.add('hidden');
}

