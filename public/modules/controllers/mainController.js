const playButton=document.getElementById('play');
const open_modal = document.getElementById('openModal');
const close_modal = document.getElementById('close');
const signupSection = document.getElementById('signup');
const signinSection = document.getElementById('signin');
const scoreboardSection = document.getElementById('scoreboard');
const signup_li = document.getElementById('signup-li');
const signin_li = document.getElementById('signin-li');
const mainModPart = document.getElementById('mainModPart');
const signupForm = document.getElementsByClassName('js-signup-group')[0];
const signinForm = document.getElementsByClassName('js-signin-group')[0];
const menu = document.getElementsByClassName('menu')[0];
const logoutBtn = document.getElementById('logout');
const menuButtonScoreBoard = document.getElementById('leaderboard');
const scoreboard = document.getElementsByClassName('js-scoreboard-table')[0];
const backToMenu = document.getElementsByClassName('backToMenu')[0];

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

const openBoard = () => {
    scoreboard.innerHTML = "";
    loadAllUsers((err, users) => {
        if (err) {
            console.error(err);
            return;
        }
        console.dir(Object.keys(users.data[0]));
        const table = document.createElement("table");
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        users.data.forEach((user) => {
            const trow = document.createElement("tr");
            const tdname = document.createElement("td");
            tdname.textContent = Object.keys(user)[0];
            const tdrating = document.createElement("td");
            tdrating.textContent = user[Object.keys(user)[0]];
            trow.appendChild(tdname);
            trow.appendChild(tdrating);
            tbody.appendChild(trow);
        });
        scoreboard.appendChild(table);
    });
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
    console.log('ahaahhah');
    event.preventDefault();
    console.log(signinForm.elements);
    const nickname = signinForm.elements['nickname-in'].value;
    const password = signinForm.elements['password-in'].value;
    auth(nickname, password, function (err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(err,resp);
        const result_message = resp['message'];
        if(result_message === "SUCCESSFULLY_AUTHED") {
            menu.classList.remove('hidden');
            open_modal.classList.add('hidden');
            playButton.classList.add('hidden');
        }
        else if (result_message === "WRONG_CREDENTIALS") {
            alert(result_message);
        }
        else if (result_message === "ALREADY_AUTHENTICATED") {
            alert("You're f*kin cheater!!!");
        }
    });
});


signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(signupForm.elements);
    const nickname = signupForm.elements['nickname-up'].value;
    const email = signupForm.elements['email-up'].value;
    const password = signupForm.elements['password-up'].value;
    const password_repeat = signupForm.elements['password-up-repeat'].value;
    if (Validator.checkName(nickname) === false) {
        console.log("sheety name");
        alert("invalid name");
    } else if (Validator.checkEmail(email) === false) {
        console.log("email govno");
        alert("invalid email");
    } else if (Validator.checkLengthPass(password) === false) {
        console.log('Меньше 8');
        alert("Too short password")
    } else if (Validator.checkPassword(password, password_repeat) === false) {
        console.log('Не совпадают');
        alert("Wrong confirm");
    }

    signUp(nickname, email, password, function (err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(err,resp);
        checkAuth();
    });

});


logoutBtn.addEventListener('click', (event) => {
    console.log('in logbtn');
    event.preventDefault();
    logout((err, resp) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(err,resp);
        checkAuth();
    });

});

menuButtonScoreBoard.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.add("hidden");
    scoreboardSection.hidden = false;
    openBoard();
});

backToMenu.addEventListener('click', (event) => {
    event.preventDefault();
    scoreboardSection.hidden = true;
    menu.classList.remove("hidden");
});



console.log(document.cookie);

checkAuth();



