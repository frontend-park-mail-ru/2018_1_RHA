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
const logoutBtn = document.getElementById('logout');
const scoreBoard = document.getElementById('leaderboard');


signupSection.hidden = true;

const sections = {
    signup: signupSection,
    signin: signinSection,
};


const checkAuth = () => {
    if (getCookie('user') !== undefined) {
        menu.classList.remove('hidden');
        open_modal.classList.add('hidden');
        playButton.classList.add('hidden');
    }
    else {
        menu.classList.add('hidden');
        open_modal.hidden = false;
        playButton.classList.remove('hidden');
        signupSection.hidden = true;
        signin_li.classList.add('active');
        signup_li.classList.remove('active');
    }
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

signinForm.addEventListener('submit',  (event) => {
    console.log('aha');

    event.preventDefault();
    console.log(signinForm.elements);
    const nickname = signinForm.elements['nickname-in'].value;
    const password = signinForm.elements['password-in'].value;
    auth(nickname, password, function (err, resp) {
        console.log(err,resp);
        checkAuth();
    });



});


signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(signupForm.elements);
    const nickname = signupForm.elements['nickname-up'].value;
    const email = signupForm.elements['email-up'].value;
    const password = signupForm.elements['password-up'].value;
    signUp(nickname, email, password, function (err, resp) {
        console.log(err,resp);
        checkAuth();
    });

});


logoutBtn.addEventListener('click', (event) => {
    console.log('in logbtn');
    event.preventDefault();
    logout((err, resp) => {
        console.log(err,resp);
        checkAuth();
    });

});

scoreBoard.addEventListener('click', (event) => {
    event.preventDefault();
    loadAllUsers((err, users) => {
        if (err) {
            console.error(err);
            return;
        }
        console.dir(users.data);
    });
});



console.log(document.cookie);

checkAuth();


