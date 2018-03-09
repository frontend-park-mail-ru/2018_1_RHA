import Block from "./block.js"

export default class InputForm extends Block {
    constructor(type, text) {
        super();
        this.inputDomElement = document.createElement("input");
        this.inputDomElement.type = type;
        this.inputDomElement.placeholder = text;

        this.divInputElement = document.createElement("div");
        this.divInputElement.appendChild(this.inputDomElement);

        this.state = true;
        this.errorElement = document.createElement("div");
        this.divInputElement.appendChild(this.errorElement);
    }

    render() {
        return this.divInputElement;
    }

    getState() {
        return this.state;
    }

    getData() {
        return this.inputDomElement.value;
    }

    setError(e) {
        if (e) {
            this.state = false;
            this.errorElement.innerHTML = e;
            this.errorElement.style.display = "block";
        } else {
            this.state = true;
            this.errorElement.style.display = "none";
        }
    }

    onInputChange(callback) {
        this.inputDomElement.addEventListener("change", (e) => {
           event.preventDefault();
           callback();
        });
    }
}