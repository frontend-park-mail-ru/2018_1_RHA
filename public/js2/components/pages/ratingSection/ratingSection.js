"use strict";
import Section from "../section.js";
import sectionSwitcher from '../../../application.js';
import UserController from "../../../modules/userController.js";
import Button from "../../blocks/button.js";

export default class RatingSection extends Section {
    constructor() {
        super();
        this.page = 1;
    }

    render() {
        this.rating = document.createElement('div');
        this.rating.innerHTML = "";
        this.load(1);

        this.prevButt = new Button('button', 'prev', this.rating);
        this.prevButt.setOnClick(() => {

            this.rating.removeChild(this.rating.firstChild);
            if (this.page === 1) {
                return;
            }

            this.page --;
            this.load(this.page);

        });

        this.nextButt = new Button('button', 'next', this.rating);
        this.nextButt.setOnClick(() => {
            this.rating.removeChild(this.rating.firstChild);
            this.page ++;
            this.load(this.page);
        });

        return this.rating;
    }


    load(page) {

        UserController.rating( page, (err, users) => {
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
                    Object.keys(data).forEach((key) => {
                        const trow = document.createElement('tr');

                        const tdname = document.createElement('td');
                        tdname.textContent = key;

                        const tdrating = document.createElement('td');
                        tdrating.textContent = data[key];

                        trow.appendChild(tdname);
                        trow.appendChild(tdrating);
                        tbody.appendChild(trow);

                    });
                    this.rating.appendChild(table);
                    console.log(data);
                }
            )
        });
    }
}