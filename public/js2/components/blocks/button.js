import Block from "./block.js";

class Button extends Block {
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

    setOnClick(callbackfn) {
        this.buttonElement.addEventListener('click', (e) => {
            event.preventDefault();
            callbackfn();
        });
    }
}

export default Block;