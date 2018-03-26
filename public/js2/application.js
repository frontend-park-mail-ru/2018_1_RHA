'use strict';

import LoginSection from './components/Views/loginSection.js';
import RegisterSection from './components/Views/registerSection.js';
import MenuSection from './components/Views/menuSection.js';
import ModalSection from './components/Views/modalSection/modalSection.js';
import PlaySection from './components/Views/playSection.js';
import renderDOM from './components/render/render.js';
import {sectionSwitcher} from "./modules/sectionSwitcher.js";
import UserController from './modules/userController.js';
import RatingSection from "./components/Views/ratingSection.js";
import ProfileSection from "./components/Views/profileSection.js";


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