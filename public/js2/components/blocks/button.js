import Block from "./block.js";

export default class Button extends Block {
    constructor(type, value, parent) {
        super();
        this.buttonWrapper = document.createElement('div');

        this.buttonElement = document.createElement('button');
        this.buttonElement.innerHTML = value;
        this.buttonElement.type = value;

        if (parent) {
            parent.appendChild(this.buttonWrapper);
        }

        this.buttonWrapper.appendChild(this.buttonElement);
    }


    render() {
        return this.buttonWrapper;
    }

    hide() {
        this.buttonWrapper.hidden = true;
    }
    show() {
        this.buttonWrapper.hidden = false;
    }

    setOnClick(callbackfn) {
        this.buttonElement.addEventListener('click', (e) => {
            event.preventDefault();
            callbackfn();
        });
    }
}
