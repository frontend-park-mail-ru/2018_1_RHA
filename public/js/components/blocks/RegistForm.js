import Form from "./form.js";
import InputButton from "./input.js";
import Button from "./button.js";
import InputForm from "./input";


export default class RegistForm extends Form {
    constructor() {
        super();
    }

    render() {
        this.Name = new InputForm("text", "nickname");
        this.Email = new InputForm("email", "email");
        this.Password = new InputForm("password", "password");
        this.Confirm = new InputForm("password", "confirm password");
        this.ButtonSubmit = new Button("submit", "Sign Up");

        // this.Email.onInputChange(); //дописать
        // this.Username.onInputChange();
        // this.Password.onInputChange();
        // this.PasswordConfirm.onInputChange();

        this.formElement.appendChild(this.Name.render());
        this.formElement.appendChild(this.Email.render());
        this.formElement.appendChild(this.Password.render());
        this.formElement.appendChild(this.Confirm.render());
        this.formElement.appendChild(this.ButtonSubmit.render());

        return this.formElement;
    }

    getFormData() {
        return {
            name: this.Name.getData(),
            email: this.Email.getData(),
            password: this.Password.getData()
        };
    }

    onSubmit(callback) {
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            callback();
        })
    }

    checkState() {
        return this.Name.getData() && this.Email.getState() &&
            this.Password.getState() && this.Confirm.getState();
    }

    // validateName() { // дописать
    //
    // }
    //
    // validatePassword() {
    //
    // }
    //
    // validateEmail() {
    //
    // }

    // confirmPassword() {
    //
    // }
}