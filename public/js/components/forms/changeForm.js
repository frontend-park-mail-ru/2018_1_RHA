import Form from './form.js';
import Input from '../blocks/input.js';
import Validator from "../../modules/validator.js";


export default class ChangeForm extends Form {
    constructor(type) {
        super();
    }

    getData() {
        return {
            name: null,
            old_password: this.OldPassword.getData(),
            password: this.Password.getData()
        }
    }

    render() {

        this.OldPassword = new Input({
            type: 'password',
            placeholder: 'old password'
        });

        this.Password = new Input({
            type: 'password',
            placeholder: 'new password'
        });

        this.RepeatPassword = new Input({
            type: 'password',
            placeholder: 'repeat password'
        });

        this.InputSubmit = new Input({
            type: 'submit',
            value: 'Send'
        });

        //TODO:: бэк
        this.OldPassword.setOnInputChange(() => {
            Validator.checkPass(this.OldPassword);
        });
        this.Password.setOnInputChange(() => {
            Validator.checkPass(this.Password);
        });
        this.RepeatPassword.setOnInputChange(() => {
            Validator.checkConfirm(this.Password, this.RepeatPassword);
        });

        this.formElement.appendChild(this.OldPassword.render());
        this.formElement.appendChild(this.Password.render());
        this.formElement.appendChild(this.RepeatPassword.render());
        this.formElement.appendChild(this.InputSubmit.render());


        return this.formElement;
    }

    setOnSubmit(callbackfn) {
        this.formElement.addEventListener('submit', (ev) => {
            ev.preventDefault();
            callbackfn();
        })
    }



}