import LoginForm from "./loginForm";

class Modal {
    constructor(childElement) {


        this.CloseLink = document.createElement("a"); //----------
        this.CloseLink.innerText = "X";

        this.LoginLi = document.createElement("li");
        this.LoginLi.innerHTML = "<a href=\"#\" data-section=\"signin\">Sign in</a>";
        this.RegistLi = document.createElement("li");
        this.RegistLi.innerHTML = "<a href=\"#\" data-section=\"signup\">Sign up</a>";
        this.SwitchSection = document.createElement("ul");
        this.SwitchSection.appendChild(this.LoginLi);
        this.SwitchSection.appendChild(this.RegistLi); //----------


        this.LoginH1 = document.createElement("h1");
        this.LoginH1.innerText = "Sign In";
        this.LoginForm = new LoginForm();
        this.LoginSection = document.createElement("section");
        this.LoginSection.appendChild(this.LoginH1);
        this.LoginSection.appendChild(this.LoginForm.render()); //------------

        this.RegistH1 = document.createElement("h1");
        this.RegistH1.innerText = "Sign Up";
        this.RegistForm = new RegistForm();
        this.RegistSection = document.createElement("section");
        this.RegistSection.appendChild(this.LoginH1);
        this.RegistSection.appendChild(this.RegistForm.render()); //-------------

        this.modalDomElement = document.createElement('div');
        this.modalDomElement.appendChild(this.SwitchSection);
        this.modalDomElement.appendChild(this.CloseLink);
        this.modalDomElement.appendChild(this.LoginSection);
        this.modalDomElement.appendChild(this.RegistSection);
    }

    render() {
        return this.modalDomElement;
    }
}