import User from "../../modules/userModel.js";

/**
 * Class represents generic Section
 */
export default class Section {
    constructor() {
        User.isAuthorized();
    }

    /**
     * Should be overriden
     */
    render() {
    }

    allowed() {
        return false;
    }


}
