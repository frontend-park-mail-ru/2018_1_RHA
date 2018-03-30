import http from './http.js';
import route from '../conf/route.js';
import bus from "./bus.js";
import router from "../application.js";

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
            this.register(user, (err, resp) => {
                if (err) {
                    console.log(err);
                    bus.emit('not_unique', "Not unique email");
                    return;
                }
                console.log(resp);
                resp.then(
                    data => {
                        switch (data.message) {
                            case 'SUCCESSFULLY_REGISTERED':
                                router.open('/menu');
                                break;
                            case 'ALREADY_AUTHENTICATED':
                                router.open('/menu');
                                break;
                            default: //TODO: придумать

                        }
                    }
                )
            })
        });
        bus.on('logout', () => {
            this.logout( (err, resp) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(resp);
            })
        });

        bus.on('user:login', (data) => {
            const user = data.payload;
            this.login(user, (err, resp) => {
                if (err) {
                    console.error(err);
                    bus.emit('alreadyAuth', 'ALREADY_AUTHENTICATED');
                    return;
                }
                console.log(resp);
                resp.then(
                    data => {
                        switch (data.message) {
                            case 'SUCCESSFULLY_AUTHED':
                                router.open('/menu');
                                break;
                            case 'WRONG_CREDENTIALS':
                                bus.emit('wrong', 'WRONG_CREDENTIALS');
                                break;

                            default: //TODO: придумать

                        }
                    }
                )
            })
        });
        // bus.on("getUser", (data) => {
        //     this.loadMe((err, resp) => {
        //         if (err) {
        //             console.log(err);
        //             return;
        //         }
        //         resp.then(
        //             response => {
        //                 this.avatar = null; //TODO: допилить аватарку
        //                 this.status = true;
        //                 console.log(response.data.email);
        //                 console.log(response.data.rating);
        //                 bus.emit("data", {email: response.data.email,
        //                                   rating: response.data.rating});
        //                 bus.emit('user:authorized', this); // TODO:: говнина
        //             }
        //         )
        //     })
        // });

        UserController.__instance = this;
    }

    /**
     * Loads user data
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    loadMe(callbackfn) {
        return http.get(route.userAPIMethods.user, callbackfn);
    }

    /**
     * To register user
     * @param userData
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    register(userData, callbackfn) {
        return http.post(route.userAPIMethods.signup, userData, callbackfn);
    }

    /**
     * Logs User in
     * @param userData
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    login(userData, callbackfn) {
        return http.post(route.userAPIMethods.login, userData, callbackfn);
    }

    /**
     * Logs user out
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    logout(callbackfn) {
        return http.post(route.userAPIMethods.logout, {}, callbackfn);
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

    /**
     * Changes user data
     * @param userData
     * @param {function} callbackfn
     * @return {PromiseLike<T>|Promise<T>}
     */
    change(userData, callbackfn) {
        return http.post(route.userAPIMethods.updateUser, userData, callbackfn);
    }

    /**
     * Check if user is authorised
     * @param callbackfn
     */
    checkAuth(callbackfn) {
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
const userController = new UserController();
export default userController;