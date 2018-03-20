'use strict';

import LoginSection from './components/pages/loginSection.js';
import RegisterSection from './components/pages/registerSection.js';
import MenuSection from './components/pages/menuSection.js';
import ModalSection from './components/pages/modalSection/modalSection.js';
import PlaySection from './components/pages/playSection.js';
import renderDOM from './components/render/render.js';
import {sectionSwitcher} from "./modules/sectionSwitcher.js";
import UserController from './modules/userController.js';
import RatingSection from "./components/pages/ratingSection/ratingSection.js";


const loginSection = new LoginSection();
const registerSection = new RegisterSection();
const menuSection = new MenuSection();
const modalSection = new ModalSection(loginSection, registerSection);
const playSection = new PlaySection();
const ratingSection = new RatingSection();



const Sections = {
    'modalSection': modalSection,
    'loginSection': loginSection,
    'registerSection': registerSection,
    'menuSection': menuSection,
    'playSection': playSection,
    'ratingSection': ratingSection
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