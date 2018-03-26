import UserController from "./userController.js";

/**
 * Class represents Model of User to store and manage user data
 */
class User {
    /**
     * Creates user and loads user data
     */
    constructor() {
        UserController.loadMe((err, me) => {
            if (err) {
                console.error("Not authorised");
                return;
            }

            me.then(
                response => {
                    console.log(response.data.username);
                    this.name = response.data.username;
                    this.email = response.data.email;
                    this.avatar = null; //TODO: допилить аватарку
                }
            )
        });
    }

}

const user = new User();

export default user;