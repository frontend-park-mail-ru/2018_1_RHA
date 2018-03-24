import Section from "./section.js";
import user from "../../modules/userModel.js";

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
        return this.profileElement;
        //TODO: сделать загрузку аватара
    }
}