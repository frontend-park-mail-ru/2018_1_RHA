import http from './http.js';
import route from '../conf/route.js';
import User from './user.js';
// error transormer

class UserController {
    constructor() {
        this.user = this.load();
    }
}
export default UserController;