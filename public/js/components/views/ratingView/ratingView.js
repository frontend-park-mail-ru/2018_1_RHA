'use strict';
import Section from '../baseView.js';
import UserController from '../../../modules/userController.js';
import bus from '../../../modules/bus.js';
import User from '../../../modules/userModel.js';
let generateRating = require('./rating.pug');

/**
 * Class represents Section with Rating Table
 */
export default class RatingSection extends Section {
	/**
     * Creates generic Section
     */
	constructor() {
		super();
		this.page = 1;
		this.sign();
	}

	/**
     * Renders and returns RaringSection DOM element
     * @return {HTMLDivElement | *}
     */
	render() {
		this.rating = document.createElement('div');
		this.rating.innerHTML = '';

		this.paginationWrap = document.createElement('div');
		this.paginationWrap.classList.add('pagination');

		this.prevButt = document.createElement('a');
		this.prevButt.innerText = '<';
		this.prevButt.addEventListener('click', event => {
			event.preventDefault();

			this.rating.removeChild(this.rating.firstChild);
			this.page--;
			this.prevButt.hidden = this.page === 1;
			this.nextButt.hidden = false;
			this.load(this.page);
		});
		this.nextButt = document.createElement('a');


		this.nextButt.innerText = '>';
		this.nextButt.addEventListener('click', event => {
			event.preventDefault();

			this.rating.removeChild(this.rating.firstChild);
			this.page++;
			if (this.page !== 1) {
				this.prevButt.hidden = false;
			}
			this.load(this.page, (empty) => {
				if (empty) {
					this.nextButt.hidden = true;
					this.lastPage = document.createElement('div');
					this.lastPage.innerText = 'This is the last page';
					this.rating.insertBefore(this.lastPage, this.rating.firstChild);
				}
			});
		});
		this.prevButt.hidden = this.page === 1;

		this.paginationWrap.appendChild(this.prevButt);
		this.paginationWrap.appendChild(this.nextButt);

		this.backButtWrap = document.createElement('div');
		this.backButtWrap.classList.add('button');
		this.backButtWrap.classList.add('back-button');

		this.backButt = document.createElement('a');
		this.backButt.setAttribute('href', '/');
		this.backButt.innerText = 'Back to menu';
		this.backButtWrap.appendChild(this.backButt);

		this.load(1, ()=>{});
		this.rating.appendChild(this.paginationWrap);
		this.rating.appendChild(this.backButtWrap);
		return this.rating;
	}

	load(page, callbackfn) {
		console.log(page);

		UserController.rating( page, (err, users) => {
			if (err) {
				console.error(err);
				callbackfn(true);
				return;
			}
			console.log(err, users);

			users.then(
				data => {
					this.table = document.createElement('div');
					this.table.innerHTML = generateRating({'data': data[0], 'user': data[1][0],
					'pages': data[2][0], 'page': page});
					this.rating.insertBefore(this.table, this.rating.firstChild);
				}
			);
		});
	}
	sign() {
		bus.on('user:authorized', ((data) => {
			this.allowed = true;
		}));

		bus.on('user:unauthorized', ((data) => {
			this.allowed = false;
		}));
	}

	allowed() {
		return User.isAuthorized();
	}
}