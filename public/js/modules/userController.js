import http from './http.js';
import route from '../conf/route.js';
import bus from './bus.js';
import Router from './router.js';
import User from './userModel.js';
// error transformer

/**
 * Class represents set of tools to work with User data
 */
class UserController {
	/**
     * Creates user and loads user data
     */
	constructor() {
		if (UserController.__instance) {
			return UserController.__instance;
		}
		bus.on('user:signup', (data) => {
			const user = data.payload;
			User.signUp(user)
				.then(
					() => {
						new Router().open('/');
					})
				.catch(
					error => {
						bus.emit('signup-error', error);
					});

		});
		bus.on('logout', () => {
			User.logout()
				.then(
					() => {
						new Router().open('/');
					}
				)
				.catch(
					error => {
						bus.emit('logout-error', error);
					}
				);
		});

		bus.on('user:login', (data) => {
			const user = data.payload;
			User.signIn(user)
				.then(
					() => {
						new Router().open('/');
					}
				)
				.catch(
					error => {
						bus.emit('login-error', error);
					}
				);
		});
		bus.on('user:update', (data) => {
			const user = data.payload;
			User.update(user)
				.then(
					() => {
						new Router().open('/');
					}
				)
				.catch(
					error => {
						bus.emit('update-error', error);
					}
				);
		});
		bus.on('user:avatarUpload', (data) => {
			const avatar = data.payload;
			console.log(avatar);
			User.uploadAvatar(avatar)
				.then(
					() => {
						new Router().open('/profile');
					}
				)
				.catch(
					error => {
						console.log(error);
					}
				);

		});

		bus.on('select-region', data => {
			console.log("im here");
			const region = data.payload;
			region.selected = true;
			region.figure.reDraw('red', 3);

		});

		UserController.__instance = this;
	}


	/**
     * Loads Rating of all Users
     * @param page
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
	rating(page, callbackfn) {
		return http.get(route.userAPIMethods.leaderBoard + '/' + page.toString(), callbackfn);
	}

}
const userController = new UserController();
export default userController;