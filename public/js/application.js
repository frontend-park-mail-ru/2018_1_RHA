'use strict';

import ProfileSection from "./components/views/profileView/profileView.js";
import RatingSection from "./components/views/ratingView/ratingView.js";
import RegisterSection from './components/views/registerView.js';
import LoginSection from "./components/views/loginView/loginView.js";
import MenuSection from './components/views/menuView/menuView.js';
import Router from "./modules/router.js";
import User from "./modules/userModel.js";

const root = document.getElementById('application');


User.auth()
    .then( (currUser) => {
        new Router(root)
            .add('/', MenuSection)
            .add('/register', RegisterSection)
            .add('/profile', ProfileSection)
            .add('/rating', RatingSection)
            .add('/login', LoginSection)
            .start()
    })
    .catch(console.error);

//TODO: profile, rating

