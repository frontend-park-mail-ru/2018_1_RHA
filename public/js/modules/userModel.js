import userController from "./userController.js";
import bus from "./bus.js";
import http from './http.js';
import route from "../conf/route.js";

/**
 * Class represents Model of User to store and manage user data
 */
let email = null;
let rating = null;
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
        //     console.log('in if   aaaaa',curUser );
        //     return Promise.resolve(curUser);
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

    update() {
        // TODO  прописать обновление пользовательских данных
    }

    static getMail() {
        return email;
    }
    static getRating() {
        return rating;
    }
}