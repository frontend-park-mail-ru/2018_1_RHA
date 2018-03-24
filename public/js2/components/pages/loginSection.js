import Section from './section.js';
import LoginForm from '../forms/loginForm.js';
import UserController from '../../modules/userController.js';
import sectionSwitcher from '../../application.js';


export default class LoginSection extends Section {
    constructor() {
        super();
    }

    render() {
        this.formHeader = document.createElement('h2');
        this.formHeader.innerText = 'Sign In';

        this.loginForm = new LoginForm();

        this.login = document.createElement('div');
        this.login.appendChild(this.formHeader);
        this.login.appendChild(this.loginForm.render());
        this.loginForm.setOnSubmit(() => {
            const userData = this.loginForm.getData();
            const jsonUserData = JSON.stringify(userData);
            console.log(jsonUserData);
            UserController.login(jsonUserData, (err, resp) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(err, resp);
                UserController.checkAuth( (isAuth) => {
                    if (isAuth) {
                        sectionSwitcher.changeSection('menuSection', root);
                    }
                })
            })
        });

        return this.login;
    }
}
