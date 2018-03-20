"use strict";
import Section from "../section.js";
import UserController from "../../../modules/userController.js";

export default class RatingSection extends Section {
    constructor() {
        super();
    }

    render() {
        this.rating = document.createElement('div');
        UserController.rating((err, resp) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log(err, resp);
            resp.then(
                table => {
                    // console.log(table.data[0]);
                    const data = table.data;
                    this.rating.innerHTML += generateRating({
                        data: [
                            {rate: 1},
                            {rate: 2},
                            {rate: 3}
                        ]
                    });
                }
            );
        });
        return this.rating;
    }
}