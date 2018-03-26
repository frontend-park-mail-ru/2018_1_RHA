'use strict';

import ProfileSection from "./components/views/profileView/profileView.js";
import RatingSection from "./components/views/ratingView/ratingView.js";
import RegisterSection from './components/views/registerView.js';
import LoginSection from "./components/views/loginView.js";
import MenuSection from './components/views/menuView.js';
import PlaySection from './components/views/playView/playView.js';
import Router from "./modules/router.js";
import Bus from "./modules/bus.js";


const root = document.getElementById('application');
console.log(root);
const router = new Router(root);

router.add('/register', RegisterSection);
router.add('/profile', ProfileSection);
router.add('/rating', RatingSection);
router.add('/login', LoginSection);
router.add('/menu', MenuSection);
router.add('/', PlaySection);
//outer.open('/menu');
router.start();
export default router;

//TODO: необходимо переделать все кнопки на теги "а" с хрефами