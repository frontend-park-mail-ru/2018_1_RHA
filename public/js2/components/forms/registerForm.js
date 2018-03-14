import Form from './form.js';
import Input from '../blocks/input.js';
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


        this.Email.setOnInputChange();
        this.Name.setOnInputChange();
        this.Password.setOnInputChange();
        this.ConfirmPassword.setOnInputChange();

        this.formElement.appendChild(this.Email.render());
        this.formElement.appendChild(this.Name.render());
        this.formElement.appendChild(this.Password.render());
        this.formElement.appendChild(this.ConfirmPassword.render());
        this.formElement.appendChild(this.InputSubmit.render());

        this.formElement.addEventListener('submit', (e) => e.preventDefault());
        return this.formElement;
    }

    getData() {
        return {
            name: this.Name.getData(),
            email: this.Email.getData(),
            password: this.Password.getData()
        };
    }

    setOnSubmit(callback) {
        // пока хз, че делать
    }

    checkState() {
        return new Promise((positive, negative) => {
            if (
                this.Email.getState() && this.Password.getState() &&
                    this.Name.getState() && this.ConfirmPassword.getState()
            ) {
                positive(this.getData());
            } else {
                negative();
            }
        });
    }

    validateEmail() {
        const formState = Validator.checkEmail(this.Email);
        this.Email.setError(formSate.errorMesage);
    }

    validatePassword() {
        const formState = Validator.checkPassword(this.Password);
        this.Password.setError(formSate.errorMesage);
    }

    validateName() {
        const formState = Validator.checkName(this.Name);
        this.Name.setError(formSate.errorMesage);
    }

    confirmPassword() {
        const formState = Validator.confirmPassword(this.Password, this.ConfirmPassword);
        this.ConfirmPassword.setError(formSate.errorMesage);
    }
}
