import http from './http.js';
import route from '../conf/route.js';
import User from './user.js';
// error transormer

class UserController {
    constructor() {
        this.user = this.loadMe();
    }
    static loadMe(callbackfn) {
        return http.get(route.userAPIMethods.user, callbackfn);
    }

    static register(userData, callbackfn) {
        return http.post(route.userAPIMethods.signup, userData, callbackfn);
    }
    static login(userData, callbackfn) {
        return http.post(route.userAPIMethods.login, userData, callbackfn);
    }

    static logout(callbackfn) {
        return http.post(route.userAPIMethods.logout, {}, callbackfn);
    }


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