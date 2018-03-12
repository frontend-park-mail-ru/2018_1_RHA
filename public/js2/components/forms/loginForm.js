import Form from './form.js';
import Input from '../blocks/input.js';
import Button from '../blocks/button.js';
/*
а еще проимпортить валидатор, и какие-то две переменные
 */

class LoginForm extends Form {
    constructor() {
        super();
    }

    getData() {
        return {
            name: this.Name.getData(),
            email: null,
            password: this.Password.getData()
        }
    }

    render() {
        this.Email = new Input({
            type: 'text',
            placeholder: 'email'
        });

        this.Password = new Input({
           type: 'password',
           placeholder: 'password'
        });

        this.InputSubmit = new Input({
            type: 'submit',
            value: 'Sign In'
        });

        /*
        навесить слушатели через валидатор
        this.Email.setOnInputChange();
        this.Password.setOnInputChange();
        */

        this.formElement.appendChild(this.Email.render());
        this.formElement.appendChild(this.Password.render());
        this.formElement.appendChild(this.InputSubmit.render());

        this.formElement.addEventListener('submit', (e) => e.preventDefault()); // непонятно

        return this.formElement;
    }
    
    checkState() {
        return new Promise((positive, negative) => {
            if (this.Email.getState() && this.Password.getState()) {
                positive(this.getFormData());
            } else {
                negative();
            }
        });
    }

    validateEmail() {
        const formState = Validator.checkEmail(this.Email);
        this.Email.setError(formState.errorMessage);
    }

    validatePassword() {
        const formState = Validator.checkPassword((this.Password));
        this.Password.setError(formState.errorMessage);
    }
}

export default LoginForm;