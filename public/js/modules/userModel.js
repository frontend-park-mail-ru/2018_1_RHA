import userController from "./userController.js";
import bus from "./bus.js";
import http from './http.js';
import route from "../conf/route.js";

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
        })
    }

    static isAuthorized() {
        return !!curUser;
    }

    static getCurUser() {
        return curUser;
    }

    static signIn(userData) {
        return new Promise( (resolve, reject) => {
            http.post(route.userAPIMethods.login, userData, (err, resp) => {
                if (err) {
                    return reject(err);
                }
                console.log(resp);
                resolve(User.auth());
            })
        })
    }

    static signUp(userData) {
        return new Promise( (resolve, reject) => {
            http.post(route.userAPIMethods.signup, userData, (err, resp) => {
                if (err) {
                    return reject(err);
                }
                console.log(resp);
                resolve(User.auth());
            })
        })
    }

    static logout() {
        return new Promise( (resolve, reject) => {
            http.post(route.userAPIMethods.logout, {}, (err, resp) => {
                if (err) {
                    return reject(err);
                }
                console.log(resp);
                resolve(User.auth());
            })
        })
    }

   static update(userData) {
        return new Promise((resolve, reject) => {
            http.post(route.userAPIMethods.updateUser, userData, (err, resp) => {
                if (err) {
                    return reject(err);
                }
                console.log(resp);
                resolve(User.auth());
            })
        })
    }

    static uploadAvatar(userData) {
        return new Promise((resolve, reject) => {
            http.post('http://localhost:3000/avatar', userData, (err, resp) => {
                if (err) {
                    return reject(err);
                }
                console.log(resp);
            })
        })
    }
}