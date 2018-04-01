import Section from "../baseView.js";
import ChangeForm from "../../forms/changeForm.js";
import Button from "../../blocks/button.js";
import bus from "../../../modules/bus.js";
import User from "../../../modules/userModel.js";
import Router from "../../../modules/router.js";

/**
 * Class represents Section with Profile data and Form
 */
export default class ProfileSection extends Section {
    /**
     * Creates generic Section
     */
    constructor() {
        super();
        this.sign();
    }

    /**
     * Renders and returns ProfileSection DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        this.profileElement = document.createElement('div');
        this.profileTable = document.createElement('table');
        this.trowMail = document.createElement('tr');
            this.tdKeyMail = document.createElement('td');
            this.tdKeyMail.textContent = 'email: ';

            this.tdValMail = document.createElement('td');


            this.tdValMail.textContent = User.getCurUser().email;

            this.trowMail.appendChild(this.tdKeyMail);
            this.trowMail.appendChild(this.tdValMail);
        this.trowName = document.createElement('tr');
            this.tdKeyName = document.createElement('td');
            this.tdKeyName.textContent = 'name: ';

            this.tdValName = document.createElement('td');

            this.tdValName.textContent = User.getCurUser().rating;

            this.trowName.appendChild(this.tdKeyName);
            this.trowName.appendChild(this.tdValName);

        this.profileTable.appendChild(this.trowMail);
        this.profileTable.appendChild(this.trowName);

        this.profileElement.appendChild(this.profileTable);

        this.changeForm = new ChangeForm();
        this.profileElement.appendChild(this.changeForm.render());

        this.backButt = new Button('button', 'Back', this.profileElement);
        this.backButt.setOnClick(() => {
            new Router().open('/menu');
        });

        this.changeForm.setOnSubmit( () => {
            const userData = this.changeForm.getData();
            const jsonUserData = JSON.stringify(userData);
            bus.emit("user:update", jsonUserData);
        });
        return this.profileElement;
        //TODO: сделать загрузку аватара
        //TODO: а еще перевести это в шаблон!!!
    }

    allowed() {
        return User.isAuthorized();
    }

    sign() {
        bus.on('update:error', data => {
            this.changeForm.Email.setError(data.payload);
        })
    }
}