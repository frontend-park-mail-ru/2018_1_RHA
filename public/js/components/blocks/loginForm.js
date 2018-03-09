import Form from "./form.js";
import InputForm from "./input.js";
import Button from "./button.js";


export default class LoginForm extends Form {
    constructor() {
        super();
    }

    getFormData() {
        return {
            name: this.Name.getData(),
            email: null,
            password: this.Password.getData()
        }
    }

    render() {
        this.Name = new InputForm("text", "nickname");
        this.Password = new InputForm("password", "password");
        this.InputSubmit = new InputForm("submit", "Sign In");

        // this.Name.onInputChange(); //дописать
        // this.Password.onInputChange();

        this.formElement.appendChild(this.Name.render());
        this.formElement.appendChild(this.Password.render());
        this.formElement.appendChild(this.InputSubmit.render());

        return this.formElement;
    }

    onSubmit(callback) {
        this.formElement.addEventListener("submit", (e) => {
           e.preventDefault();
           callback();
        });
    }

    checkState() {
        return this.Name.getState() && this.Password.getState();
    }

    // validateName() { // дописать
    //
    // }
    //
    // validatePassword() {
    //
    // }
}