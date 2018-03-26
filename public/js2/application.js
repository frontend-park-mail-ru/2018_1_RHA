'use strict';

import LoginSection from './components/views/loginView.js';
import RegisterSection from './components/views/registerView.js';
import MenuSection from './components/views/menuView.js';
import ModalSection from './components/views/modalSection/modalView.js';
import PlaySection from './components/views/playView.js';
import renderDOM from './components/render/render.js';
import {sectionSwitcher} from "./modules/sectionSwitcher.js";
import UserController from './modules/userController.js';
import RatingSection from "./components/views/ratingView.js";
import ProfileSection from "./components/views/profileView.js";


const loginSection = new LoginSection();
const registerSection = new RegisterSection();
const menuSection = new MenuSection();
const modalSection = new ModalSection(loginSection, registerSection);
const playSection = new PlaySection();
const ratingSection = new RatingSection();
const profileSection = new ProfileSection();


const Sections = {
    'modalSection': modalSection,
    'loginSection': loginSection,
    'registerSection': registerSection,
    'menuSection': menuSection,
    'playSection': playSection,
    'ratingSection': ratingSection,
    'profileSection': profileSection
};

sectionSwitcher.setSections(Sections);



UserController.checkAuth( (isAuth) => {
    console.log(isAuth);
    if (isAuth) {
        sectionSwitcher.changeSection('menuSection', root);   //Что за root? Оно работает, но я не понимаю
    } else {
        renderDOM(playSection.render(), document.getElementById('root'));
    }
});



export default sectionSwitcher;