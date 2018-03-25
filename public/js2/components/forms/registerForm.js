import Form from './form.js';
import Input from '../blocks/input.js';
import Validator from "../../modules/validator.js";
// validator
// и какие-то глобальные переменные

export default class RegisterForm extends Form {
    constructor() {
        super();
        this.state = true;
    }

    render() {
        this.Email = new Input({
            type: "text",
            placeholder: "email"
        });

        this.Name = new Input({
            type: "text",
            placeholder: "name"
        });

        this.Password = new Input({
            type: "password",
            placeholder: "password"
        });

        this.ConfirmPassword = new Input({
            type: "password",
            placeholder: "confirm password"
        });

        this.InputSubmit = new Input({
            type: 'submit',
            value: 'Sign Up'
        });


        this.Email.setOnInputChange(() => {});  //заглушки
        this.Name.setOnInputChange(() => {});
        this.Password.setOnInputChange(() => {});
        this.ConfirmPassword.setOnInputChange(() => {});

        this.formElement.appendChild(this.Email.render());
        this.formElement.appendChild(this.Name.render());
        this.formElement.appendChild(this.Password.render());
        this.formElement.appendChild(this.ConfirmPassword.render());
        this.formElement.appendChild(this.InputSubmit.render());

        return this.formElement;
    }

    getData() {

        const validName = this.Name.getData();
        const validEmail = this.Email.getData();
        const validPass = this.Password.getData();
        const validConfPass = this.ConfirmPassword.getData();

        if (Validator.checkMail(validEmail) === false) {
            this.state = false;
            console.log('wrong mail');
            //TODO: добавить ошибку
        } else {
            this.state = true;
        }
        if (Validator.checkName(validName) === false) {
            this.state = false;
            console.log('wrong name');
        }
        else {
            this.state = true;
        }
        if (Validator.ckeckPass(validPass) === false) {
            this.state = false;
            console.log('wrong pass');
        } else {
            this.state = true;
        }
        if (Validator.checkConfirm(validPass, validConfPass) === false) {
            this.state = false;
            console.log('Passwords do not match');
        } else {
            this.state = true;
        }

        if (this.state === true) {
            return {
                name: this.Name.getData(),
                email: this.Email.getData(),
                password: this.Password.getData()
            };
        } else {
            return null;
        }

    }

    setOnSubmit(callbackfn) {
        this.formElement.addEventListener('submit', (ev) => {
            ev.preventDefault();
            callbackfn();
        })
    }



}
