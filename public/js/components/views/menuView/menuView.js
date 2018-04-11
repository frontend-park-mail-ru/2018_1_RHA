import Section from '../baseView.js';
import bus from '../../../modules/bus.js';
import Router from '../../../modules/router.js';
import User from '../../../modules/userModel.js';


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
		debugger;
		if (document.getElementById('application') == null) {
			document.getElementById('body').innerHTML = '' +
				'<div id="radar-wrapper">\n' +
				'\t\t\t<div id="bg"></div>\n' +
				'\t\t\t<div id="radar"></div>\n' +
				'\t\t\t</div>\n' +
				'\n' +
				'\t\t\t<div id="application-wrapper" class="body">\n' +
				'\t\t\t<div id="application"></div>\n' +
				'\t\t\t</div>';
		}
		this.menu = document.createElement('div');
		this.attrsActive = [
			{
				title: 'singleplayer',
				href: '/singleplayer'
			},
			{
				title: 'multiplayer',
				href: '#'
			},
			{
				title: 'profile',
				href: '/profile'
			},
			{
				title: 'rating',
				href: '/rating'
			},
		];
		this.attrPassive = [
			{
				title: 'singleplayer',
				href: '/singleplayer'
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
			this.logoutWrapper = document.createElement('div');
			this.logoutWrapper.classList.add('button');
			this.logoutWrapper.appendChild(this.logout);
			this.menu.appendChild(this.logoutWrapper);
		}
		else {
			this.menu.innerHTML = generateMenu({'attrs': this.attrPassive});
		}
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
