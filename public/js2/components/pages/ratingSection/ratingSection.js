import Section from '../section.js';
import sectionSwitcher from '../../../application.js';
import UserController from "../../../modules/userController.js";

export default class RatingSection extends Section {
    constructor() {
        super();
    }
    render() {
        this.rating = document.createElement('div');
        this.rating.innerHTML = "";
        UserController.rating( (err, users) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(err, users);
            const table = document.createElement("table");
            const tbody = document.createElement("tbody");
            table.appendChild(tbody);
            users.then(
                data => {
                    for (let val of Object.values(data.data)) {
                        const trow = document.createElement('tr');
                        const tdname = document.createElement('td');
                        tdname.textContent = Object.keys(val)[0];
                        const tdrating = document.createElement('td');
                        tdrating.textContent = Object.values(val)[0];
                        trow.appendChild(tdname);
                        trow.appendChild(tdrating);
                        tbody.appendChild(trow);
                    }
                    this.rating.appendChild(table);
                }
            )





        });
        return this.rating;
    }
}