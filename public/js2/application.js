"use strict";

import LoginSection from './components/pages/loginSection.js';
import RegisterSection from './components/pages/registerSection.js';
import MenuSection from './components/pages/menuSection.js';
import ModalSection from './components/pages/modalSection/modalSection.js';
import PlaySection from './components/pages/playSection.js';
import renderDOM from './components/render/render.js';


const loginSection = new LoginSection();
const registerSection = new RegisterSection();
const menuSection = new MenuSection();
const modalSection = new ModalSection(loginSection, registerSection);
const playSection = new PlaySection(application);


renderDOM(playSection.render(), document.getElementById('root'));


const Sections = {
    'modalSection': modalSection,
    'loginSection': loginSection,
    'registerSection': registerSection,
    'menuSection': menuSection,
};
