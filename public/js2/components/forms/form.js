import Block from '../blocks/block';

class Form extends Block {
    constructor() {
        super();
        this.formElement = document.createElement('form');
    }

    render() {

    }

    reset() {
        this.formElement.reset();
    }

    setOnSubmit() {

    }
}

export default Form