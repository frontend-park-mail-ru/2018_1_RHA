import Block from "./block.js";
/** Class representing button */
export default class Button extends Block {
    /**
     * Create a button
     * @param {string} type   - type of the button
     * @param {string} value  - inner text
     * @param {string} parent - parent element
     */
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

    /**
     * Get the button DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        return this.buttonWrapper;
    }

    /**
     * To make a button hidden
     */
    hide() {
        this.buttonWrapper.hidden = true;
    }

    /**
     * To make button visible
     */
    show() {
        this.buttonWrapper.hidden = false;
    }

    /**
     * Defines behaviour on click
     * @param {function} callbackfn - button click handler
     */
    setOnClick(callbackfn) {
        this.buttonElement.addEventListener('click', (e) => {
            event.preventDefault();
            callbackfn();
        });
    }
}
