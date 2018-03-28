'use strict';

import ProfileSection from "./components/views/profileView/profileView.js";
import RatingSection from "./components/views/ratingView/ratingView.js";
import PlaySection from './components/views/playView/playView.js';
import RegisterSection from './components/views/registerView.js';
import LoginSection from "./components/views/loginView/loginView.js";
import MenuSection from './components/views/menuView/menuView.js';
import ModalView from './components/views/modalView/modalView.js';
import Router from "./modules/router.js";
import bus from "./modules/bus.js";
import userController from "./modules/userController.js";
import User from "./modules/userModel.js";

const root = document.getElementById('application');
const router = new Router(root);
//
router.add('/register', RegisterSection);
router.add('/profile', ProfileSection);
router.add('/rating', RatingSection);
router.add('/login', LoginSection);
router.add('/menu', MenuSection);
router.add('/', PlaySection);
router.add('/landing', ModalView);
router.start();

export default router;

const user = new User();

//TODO: проверка на авторизацию

//TODO: дописать в меню кнопки

//TODO: profile, rating

