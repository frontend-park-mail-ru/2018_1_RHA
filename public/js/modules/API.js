import HTTP from "./http";
export default class API {

    static backendServer = "bf-balance.herokuapp.com";

    static callback(err, resp) {
        console.log(err, resp);
    }

    static register(userData) {
        const path =  this.backendServer.concat("/users/create");
        return HTTP.send(userData, path, "POST", this.callback);
    }

    static login(userData) {
        const path = this.backendServer.concat("/users/auth");
        return HTTP.send(userData, path, "POST", this.callback);
    }

    static getUserInfo() {
        const path = this.backendServer.concat("/users/info");
        return HTTP.send(null, path, "GET", this.callback);
    }

    static chageUserInfo(userData) {
        const path = this.backendServer.concat("/users/change");
        return HTTP.send(userData, path, "POST", this.callback);
    }

    static logout() {
        const path = this.backendServer.concat("/users/logout");
        return HTTP.send(userData, path, "POST", this.callback);
    }
}