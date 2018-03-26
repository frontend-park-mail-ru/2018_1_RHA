"use strict";
import Section from "./section.js";
import sectionSwitcher from '../../application.js';
import UserController from "../../modules/userController.js";
import Button from "../blocks/button.js";

/**
 * Class represents Section with Rating Table
 */
export default class RatingSection extends Section {
    /**
     * Creates generic Section
     */
    constructor() {
        super();
        this.page = 1;
    }

    /**
     * Renders and returns RaringSection DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        this.rating = document.createElement('div');
        this.rating.innerHTML = "";

        this.prevButt = new Button('button', 'prev', this.rating);
        this.prevButt.setOnClick(() => {

            if (this.page === 1) {
                return;
            }
            this.rating.removeChild(this.rating.firstChild);

            this.page --;
            this.nextButt.show();
            this.load(this.page);

        });

        this.nextButt = new Button('button', 'next', this.rating);
        this.nextButt.setOnClick(() => {
            this.rating.removeChild(this.rating.firstChild);
            this.page ++;
            this.load(this.page, (empty) => {
                if (empty) {
                    this.nextButt.hide();
                    this.lastPage = document.createElement('div');
                    this.lastPage.innerText = 'This is the last page';
                    this.rating.insertBefore(this.lastPage, this.rating.firstChild);
                }
            });
        });

        this.backButt = new Button('button', 'Back', this.rating);
        this.backButt.setOnClick(() => {
            this.page = 1;
            sectionSwitcher.changeSection('menuSection', root);
        });

        this.load(1);

        return this.rating;
    }

    load(page, callbackfn) {
        console.log(page);

        UserController.rating( page, (err, users) => {
            if (err) {
                console.error(err);
                callbackfn(true);
                return;
            }
            console.log(err, users);
            const table = document.createElement("table");
            const tbody = document.createElement("tbody");
            table.appendChild(tbody);

            users.then(
                data => {
                    Object.keys(data).forEach((key) => {
                        if (key !== 'pages') {
                            const trow = document.createElement('tr');

                            const tdname = document.createElement('td');
                            tdname.textContent = key;

                            const tdrating = document.createElement('td');
                            tdrating.textContent = data[key];

                            trow.appendChild(tdname);
                            trow.appendChild(tdrating);
                            tbody.appendChild(trow);
                        }
                    });
                    this.rating.insertBefore(table, this.rating.firstChild);
                    // this.rating.appendChild(table);
                    console.log(data);
                }
            );
        });

    }
}