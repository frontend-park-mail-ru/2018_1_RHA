import Form from './form.js';
import Input from '../blocks/input.js';
import Validator from "../../modules/validator.js";
// validator
// и какие-то глобальные переменные

export default class RegisterForm extends Form {
    constructor() {
        super();
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


        this.Email.setOnInputChange(() => {
            Validator.checkMail(this.Email);
        });
        this.Name.setOnInputChange(() => {
            Validator.checkName(this.Name);
        });
        this.Password.setOnInputChange(() => {
            Validator.checkPass(this.Password);
        });
        this.ConfirmPassword.setOnInputChange(() => {
            Validator.checkConfirm(this.Password, this.ConfirmPassword);
        });

        this.formElement.appendChild(this.Email.render());
        this.formElement.appendChild(this.Name.render());
        this.formElement.appendChild(this.Password.render());
        this.formElement.appendChild(this.ConfirmPassword.render());
        this.formElement.appendChild(this.InputSubmit.render());

        return this.formElement;
    }

    getData() {

        if (
            this.Email.getState() &&
            this.Name.getState() &&
            this.Password.getState() &&
            this.ConfirmPassword.getState()
        ) {
            return {
                name: this.Name.getData(),
                email: this.Email.getData(),
                password: this.Password.getData()
            };
        }

        return null;

    }

    setOnSubmit(callbackfn) {
        this.formElement.addEventListener('submit', (ev) => {
            ev.preventDefault();
            callbackfn();
        })
    }
}
