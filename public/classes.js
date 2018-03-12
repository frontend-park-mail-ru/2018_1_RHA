class LoginForm {
    constructor() {
        this.DOMelement = document.createElement('div');
        this.NameInput = "LFormNameInput";
        this.PasswordInput = "LFormPasswordInput";
        this.DOMelement.innerHTML = generateLoginForm({
            login: this.NameInput,
            password: this.PasswordInput
        });
    }

    render() {
        return this.DOMelement;
    }

    onSubmit() {
        
    }

}