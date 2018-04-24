import http from './http.js';
import route from '../conf/route.js';

/**
 * Class represents Model of User to store and manage user data
 */
let curUser = null;
export default class User {
	/**
     * Creates user and loads user data
     */
	constructor(data) {
		this.email = data.email;
		this.rating = data.rating;
	}

	/**
	 * Authenticates user
	 * @return {Promise<any>}
	 */
	static auth() {
		// if (curUser) {
		//     resolve(curUser);
		// }
		return new Promise( (resolve, reject) => {
			http.get(route.userAPIMethods.user, (err, resp) => {
				if (err) {
					if (err.status === 401) {
						curUser = null;
						return resolve(null);
					}
					return reject(err);
				}
				resp.then(
					promiseValue => {
						curUser = new User(promiseValue.data);
						resolve(curUser);
					}
				);

			});
		});
	}

	/**
	 * If user authorized
	 * @return {boolean}
	 */
	static isAuthorized() {
		return !!curUser;
	}

	/**
	 * Returns current user
	 * @return {User}
	 */
	static getCurUser() {
		return curUser;
	}

	/**
	 * Signs user in
	 * @param userData
	 * @return {Promise<any>}
	 */
	static signIn(userData) {
		return new Promise( (resolve, reject) => {
			http.post(route.userAPIMethods.login, userData, (err, resp) => {
				if (err) {
					return reject(err);
				}
				console.log(resp);
				resolve(User.auth());
			});
		});
	}

	/**
	 * signs user Up
	 * @param userData
	 * @return {Promise<any>}
	 */
	static signUp(userData) {
		return new Promise( (resolve, reject) => {
			http.post(route.userAPIMethods.signup, userData, (err, resp) => {
				if (err) {
					return reject(err);
				}
				console.log(resp);
				resolve(User.auth());
			});
		});
	}

	/**
	 * logs user Off
	 * @return {Promise<any>}
	 */
	static logout() {
		return new Promise( (resolve, reject) => {
			http.post(route.userAPIMethods.logout, {}, (err, resp) => {
				if (err) {
					return reject(err);
				}
				console.log(resp);
				resolve(User.auth());
			});
		});
	}

	/**
	 * updates user data
	 * @param userData
	 * @return {Promise<any>}
	 */
	static update(userData) {
		return new Promise((resolve, reject) => {
			http.post(route.userAPIMethods.updateUser, userData, (err, resp) => {
				if (err) {
					return reject(err);
				}
				console.log(resp);
				resolve(User.auth());
			});
		});
	}

	/**
	 * uploads user's avatar
	 * @param userData
	 * @return {Promise<any>}
	 */
	static uploadAvatar(userData) {
		return new Promise((resolve, reject) => {
			http.post(route.userAPIMethods.updateAvatar, userData, (err, resp) => {
				if (err) {
					return reject(err);
				}
				console.log(resp);
			});
		});
	}
}