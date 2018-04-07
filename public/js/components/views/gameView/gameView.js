import Section from "../baseView.js";
import User from "../../../modules/userModel.js";

export default class GameSection extends Section {
    constructor () {
        super();
    }

    render(parent) {
        this.gameHeader = document.createElement('h1');
        this.gameHeader.innerText = "Super Game!";
        return this.gameHeader;
    }
    allowed() {
        // return User.isAuthorized();
        return true;
    }
}