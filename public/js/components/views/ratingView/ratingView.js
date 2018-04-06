"use strict";
import Section from "../baseView.js";
import UserController from "../../../modules/userController.js";
import Button from "../../blocks/button.js";
import bus from "../../../modules/bus.js";
import Router from "../../../modules/router.js";
import User from "../../../modules/userModel.js";


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
        this.sign();
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
        this.backButt.render().classList.add("page-button");
        this.backButt.setOnClick(() => {
            this.page = 1;
            new Router().open('/')
        });

        this.load(1, ()=>{});
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

            users.then(
                data => {
                    console.log(data);
                    this.table = document.createElement('div');
                    this.table.innerHTML = generateRating({"data": data[0]});
                    this.rating.insertBefore(this.table, this.rating.firstChild);
                }
            );
        });
    }
    sign() {
        bus.on('user:authorized', ((data) => {
            this.allowed = true;
        }));

        bus.on('user:unauthorized', ((data) => {
            this.allowed = false;
        }));
    }

    allowed() {
        return User.isAuthorized();
    }
}