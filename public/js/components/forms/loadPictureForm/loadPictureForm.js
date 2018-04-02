import Form from "../form.js";
import Input from "../../blocks/input.js";


export default class LoadForm extends Form {
    constructor(type) {
        super();
    }

    render() {
        this.UploadInput = new Input({
            type: "file",
            placeholder: ""
        });
        this.UploadSubmit = new Input({
            type: "submit",
            value: "Save picture"
        });

        this.formElement.appendChild(this.UploadInput.render());
        this.formElement.appendChild(this.UploadSubmit.render());

        this.formElement.setAttribute("enctype", "multipart/form-data");
        this.formElement.classList.add('form__loadFile');
        return this.formElement;
    }
}