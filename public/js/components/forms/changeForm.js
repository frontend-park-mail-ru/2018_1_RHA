import Form from './form.js';
import Input from '../blocks/input.js';
// newInputData
import Button from '../blocks/button.js';
// despicable teens

export default class ChangeForm extends Form {
    constructor(type) {
        super();
    }

    getData() {
        return {
            name: null,
            email: this.Email.getData(),
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
            value: 'Send'
        });

        this.Email.setOnInputChange(() => {});  //заглушки
        this.Password.setOnInputChange(() => {});

        this.formElement.appendChild(this.Email.render());
        this.formElement.appendChild(this.Password.render());
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