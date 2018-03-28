import userController from "./userController.js";
import bus from "./bus.js";

/**
 * Class represents Model of User to store and manage user data
 */
class User {
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
                    this.email = response.data.email;
                    this.rating = response.data.rating;
                    console.log({
                        'email': this.email,
                        'rating': this.rating
                    });
                    this.avatar = null; //TODO: допилить аватарку
                    this.status = true;
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
}

const user = new User();

export default user;