'use strict';

import ProfileSection from "./components/views/profileView/profileView.js";
import RatingSection from "./components/views/ratingView/ratingView.js";
import PlaySection from './components/views/playView/playView.js';
import RegisterSection from './components/views/registerView.js';
import LoginSection from "./components/views/loginView/loginView.js";
import MenuSection from './components/views/menuView/menuView.js';
import ModalView from './components/views/modalView/modalView.js';
import Router from "./modules/router.js";
import User from "./modules/userModel.js";

const root = document.getElementById('application');


User.auth()
    .then( (currUser) => {
        new Router(root)
            .add('/', PlaySection)
            .add('/register', RegisterSection)
            .add('/profile', ProfileSection)
            .add('/rating', RatingSection)
            .add('/menu', MenuSection)
            .add('/login', LoginSection)
            .add('/landing', ModalView)
            .start()
    })
    .catch(console.error);





//TODO: profile, rating

