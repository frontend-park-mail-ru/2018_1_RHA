import http from './http.js';
import route from '../conf/route.js';
import User from './user.js';
// error transormer

class UserController {
    constructor() {
        this.user = this.loadMe();
    }
    loadMe() {
        return http.get(route.userAPIMethods.user)
            .then (
                response => {
                    if (response.status === 200) {
                        try {
                            //callbackfn(null, response);
                            return JSON.parse(response);
                        }
                        catch(err) {
                            console.error('loadMe error', err);
                        }

                    } else {
                        //callbackfn(response, null);
                    }
                }
            )
    }

    register(userData) {
        debugger;
        return http.post(route.userAPIMethods.signup)
            .then (
                response => {
                    if (response === 200) {
                        try {
                            return JSON.parse(response);
                        }
                        catch (err) {
                            console.error('register error', err);
                        }
                    }
                    else {
                        return;
                    }
                }
            )

    }
}

export default UserController;