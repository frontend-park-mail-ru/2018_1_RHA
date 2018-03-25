import UserController from "./userController.js";

class User {
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