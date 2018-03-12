import Block from "./block";

class Input extends Block {
    constructor(data) {
        super();

        this.InputElement = document.createElement('input');
        this.InputElement.type = data.type;
        if(data.type === 'submit')
            this.InputElement.value = data.value;
        else
            this.InputElement.placeholder = data.placeholder;

        this.InputWrapper = document.createElement('div');
        this.InputWrapper.appendChild(this.InputElement);

        this.state = false;

        this.ErrorElement = document.createElement('div');
        this.InputWrapper.appendChild(this.ErrorElement);
    }

    render() {
        return this.InputWrapper;
    }

    getState() {
        return this.state;
    }

    getData() {
        return this.InputElement.value;
    }

    setError(error) {
        if (error) {
            this.state = false;
            this.ErrorElement.innerHTML = error;
            this.ErrorElement.style.display = "block";
        } else {
            this.state = true;
            this.ErrorElement.style.display = "none";
        }
    }

    setOnInputChange(callbackfn) {
        this.InputElement.addEventListener('change', (e) => {
           event.preventDefault();
           callbackfn();
        });
    }
}

export default Input;