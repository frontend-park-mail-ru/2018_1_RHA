import http from './http.js';
import route from '../conf/route.js';

// error transformer

/**
 * Class represents set of tools to work with User data
 */
class UserController {
    /**
     * Creates user and loads user data
     */
    constructor() {
        this.user = this.loadMe();
    }

    /**
     * Loads user data
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    static loadMe(callbackfn) {
        return http.get(route.userAPIMethods.user, callbackfn);
    }

    /**
     * To register user
     * @param userData
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    static register(userData, callbackfn) {
        return http.post(route.userAPIMethods.signup, userData, callbackfn);
    }

    /**
     * Logs User in
     * @param userData
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    static login(userData, callbackfn) {
        return http.post(route.userAPIMethods.login, userData, callbackfn);
    }

    /**
     * Logs user out
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    static logout(callbackfn) {
        return http.post(route.userAPIMethods.logout, {}, callbackfn);
    }

    /**
     * Loads Rating of all Users
     * @param page
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    static rating(page, callbackfn) {
        return http.get(route.userAPIMethods.leaderBoard + '/' + page.toString(), callbackfn);
    }

    /**
     * Changes user data
     * @param userData
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    static change(userData, callbackfn) {
        return http.post(route.userAPIMethods.updateUser, userData, callbackfn);
    }

    /**
     * Check if user is authorised
     * @param callbackfn
     */
    static checkAuth(callbackfn) {
        this.loadMe( (err, me ) => {
            if (err) {
                console.log('Not authorized');
                callbackfn(false);
                return;
            }
            console.log('i am', me);
            callbackfn(true);
        });
    }
}

export default UserController;