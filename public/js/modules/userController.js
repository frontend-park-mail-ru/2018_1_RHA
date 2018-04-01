import http from './http.js';
import route from '../conf/route.js';
import bus from "./bus.js";
import Router from "./router.js";
import User from "./userModel.js";
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
        bus.on("user:signup", (data) => {
            const user = data.payload;
            User.signUp(user)
                .then(
                    user => {
                        new Router().open('/menu');
                })
                .catch(
                    error => {
                        bus.emit('signup-error', error);
                })

        });
        bus.on('logout', () => {
            User.logout()
                .then(
                    user => {
                        new Router().open('/');
                    }
                )
                .catch(
                    error => {
                        bus.emit('logout-error', error);
                    }
                )
        });

        bus.on('user:login', (data) => {
            const user = data.payload;
            User.signIn(user)
                .then(
                    user => {
                        new Router().open('/menu');
                    }
                )
                .catch(
                    error => {
                        bus.emit('login-error', error);
                    }
                )
        });
        bus.on('user:update', (data) => {
            const user = data.payload;
            User.update(user)
                .then(
                    user => {
                        new Router().open('/menu');
                    }
                )
                .catch(
                    error => {
                        bus.emit('update-error', error);
                    }
                )
        });


        UserController.__instance = this;
    }

    // /**
    //  * Loads user data
    //  * @param {function} callbackfn
    //  * @return {PromiseLike<T>|Promise<T>}
    //  */
    // loadMe(callbackfn) {
    //     return http.get(route.userAPIMethods.user, callbackfn);
    // }
    //
    // /**
    //  * To register user
    //  * @param userData
    //  * @param {function} callbackfn
    //  * @return {PromiseLike<T>|Promise<T>}
    //  */
    // register(userData, callbackfn) {
    //     return http.post(route.userAPIMethods.signup, userData, callbackfn);
    // }
    //
    // /**
    //  * Logs User in
    //  * @param userData
    //  * @param {function} callbackfn
    //  * @return {PromiseLike<T>|Promise<T>}
    //  */
    // login(userData, callbackfn) {
    //     return http.post(route.userAPIMethods.login, userData, callbackfn);
    // }
    //
    // /**
    //  * Logs user out
    //  * @param {function} callbackfn
    //  * @return {PromiseLike<T>|Promise<T>}
    //  */
    // logout(callbackfn) {
    //     return http.post(route.userAPIMethods.logout, {}, callbackfn);
    // }

    /**
     * Loads Rating of all Users
     * @param page
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    rating(page, callbackfn) {
        return http.get(route.userAPIMethods.leaderBoard + '/' + page.toString(), callbackfn);
    }

    // /**
    //  * Changes user data
    //  * @param userData
    //  * @param {function} callbackfn
    //  * @return {PromiseLike<T>|Promise<T>}
    //  */
    // change(userData, callbackfn) {
    //     return http.post(route.userAPIMethods.updateUser, userData, callbackfn);
    // }


}
const userController = new UserController();
export default userController;