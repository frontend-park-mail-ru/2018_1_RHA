import userController from "./userController.js";
import bus from "./bus.js";

/**
 * Class represents Model of User to store and manage user data
 */
let email = null;
let rating = null;
export default class User {
    /**
     * Creates user and loads user data
     */
    constructor() {

        userController.loadMe((err, me) => {
            if (err) {
                console.error("Not authorised");
                return;
            }

            me.then(
                response => {
                    this.avatar = null; //TODO: допилить аватарку
                    this.status = true;
                    email = response.data.email;
                    rating = response.data.rating;
                    bus.emit('user:authorized', this);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.status = false;
                }
            )
        });
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