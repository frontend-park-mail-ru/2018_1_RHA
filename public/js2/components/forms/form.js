import Block from '../blocks/block.js';

export default class Form extends Block {
    constructor() {
        super();
        this.formElement = document.createElement('form');
    }

    render() {

    }

    reset() {
        this.formElement.reset();
    }

    setOnSubmit(callbackfn) {
    }

    //TODO после сабмита пробешаешься по всем инпутам и проверяешь их стейты
    //TODO если что-то не так, то тогда от компоненты вызываешь setError, который должен разхидить errorElement
}