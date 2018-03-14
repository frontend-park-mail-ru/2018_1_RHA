import Form from './form.js';
import Input from '../blocks/input.js';
// newInputData
import Button from '../blocks/button.js';
// despicable teens

export default class ChangeUserData extends Form {
    constructor(type) {
        super();
        this.type = type;
    }

    getFormData() {
        return this.input.getData();
    }

    render() {
        switch (this.type) {
            case 'email':
                this.renderEmail();
                break;
            case 'name':
                this.rendrName();
                break;
            case 'password':
                this.renderPassword();
                break;
        }

        this.sendButton = new Button('submit', 'Send');
        this.formElement.appendChild(this.sendButton.render());

        return this.formElement;
    }

    renderEmail() {
        this.input = new Input({
            type: 'email',
            placeholder: 'new email'
        });

        this.formElement.appendChild(this.input.render());
    }

    renderPassword() {
        this.input = new Input({
            type: 'password',
            placeholder: 'new password'
        });

        this.formElement.appendChild(this.input);
    }

    renderName() {
        this.input = new Input({
            type: 'password',
            placeholder: 'new name'
        });

        this.formElement.appendChild(this.input);
    }

    setOnSubmit(callbackfn) {
        //
    }
}