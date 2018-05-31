import Section from '../baseView.js';
import bus from '../../../modules/bus.js';
import Router from '../../../modules/router.js';
import User from '../../../modules/userModel.js';
let generateMenu = require('./menu.pug');

/**
 * Class represents Section with Menu buttons
 */
export default class MenuSection extends Section {
	/**
     * Creates generic section
     */
	constructor(){
		super();
		this.sign();
	}

	/**
     * Renders and returns MenuSection DOM element
     * @return {HTMLDivElement | *}
     */
	render() {
		this.menu = document.createElement('div');
		this.attrsActive = [
			{
				title: 'Training',
				href: '/training'
			},
			{
				title: 'Multiplayer',
				href: '/multiplayer'
			},
			{
				title: 'Profile',
				href: '/profile'
			},
			{
				title: 'Rating',
				href: '/rating'
			},
		];
		this.attrPassive = [
			{
				title: 'Training',
				href: '/training'
			},
			{
				title: 'Sign In',
				href: '/login'
			},
			{
				title: 'Sign Up',
				href: '/register'
			},
		];

		if (User.isAuthorized()) {
			this.menu.innerHTML = generateMenu({'attrs': this.attrsActive});
			this.logout = document.createElement('a');
			this.logout.setAttribute('href', '/');
			this.logout.innerText = 'logout';
			this.logout.addEventListener('click', (e) => {
				e.preventDefault();
				bus.emit('logout', null);
			});
			this.logoutWrapper = this.menu.getElementsByClassName('logout')[0];
			this.lW = document.createElement('div');
			this.lW.classList.add('button');
			this.logoutWrapper.appendChild(this.lW);
			this.lW.appendChild(this.logout);
		}
		else {
			this.menu.innerHTML = generateMenu({'attrs': this.attrPassive});
		}
		this.menu.classList.add('menu-wrapp');
		return this.menu;
	}

	allowed() {
		return true;
	}

	sign() {
		bus.on('user:authorized', (() => {
			this.allow = true;
			new Router().open('/menu');
		}));

		bus.on('user:unauthorized', (() => {
			this.allow = false;
		}));

		bus.on('menu:hide', (() => {
			this.hide();
		}));
	}

	hide() {
		this.menu.setAttribute('hidden', 'hidden');
	}
}
