import Section from "./section.js";
import user from "../../modules/userModel.js";
import ChangeForm from "../forms/changeForm.js";
import UserController from "../../modules/userController.js";
import sectionSwitcher from "../../application.js";
import Button from "../blocks/button.js";


export default class ProfileSection extends Section {
    constructor() {
        super();
    }

    render() {
        this.profileElement = document.createElement('div');
        this.profileTable = document.createElement('table');



        this.trowMail = document.createElement('tr');
            this.tdKeyMail = document.createElement('td');
            this.tdKeyMail.textContent = 'email: ';

            this.tdValMail = document.createElement('td');
            this.tdValMail.textContent = user.email;

            this.trowMail.appendChild(this.tdKeyMail);
            this.trowMail.appendChild(this.tdValMail);
        this.trowName = document.createElement('tr');
            this.tdKeyName = document.createElement('td');
            this.tdKeyName.textContent = 'name: ';

            this.tdValName = document.createElement('td');
            this.tdValName.textContent = user.name;

            this.trowName.appendChild(this.tdKeyName);
            this.trowName.appendChild(this.tdValName);

        this.profileTable.appendChild(this.trowMail);
        this.profileTable.appendChild(this.trowName);

        this.profileElement.appendChild(this.profileTable);

        this.changeForm = new ChangeForm();
        this.profileElement.appendChild(this.changeForm.render());

        this.backButt = new Button('button', 'Back', this.profileElement);
        this.backButt.setOnClick(() => {
            sectionSwitcher.changeSection('menuSection', root);
        });

        this.changeForm.setOnSubmit( () => {
            const userData = this.changeForm.getData();
            const jsonUserData = JSON.stringify(userData);
            UserController.change(jsonUserData, (err, resp) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(err, resp);
                UserController.checkAuth( (isAuth) => {
                    if (isAuth) {
                        sectionSwitcher.changeSection('menuSection', root); //Что за root? Оно работает, но я не понимаю
                    }
                });
            })
        });

        return this.profileElement;
        //TODO: сделать загрузку аватара
    }
}