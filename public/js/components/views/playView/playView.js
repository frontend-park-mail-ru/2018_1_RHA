import Section from '../baseView.js';
import bus from "../../../modules/bus.js";
import User from "../../../modules/userModel.js";


/**
 * Class represents Section with main Play button
 */
export default class PlaySection extends Section {
    /**
     * Creates generic section and wraps into parent element
     * @param {HTMLDivElement} parent – parent element
     */
    constructor(parent) {
        super();
        this.parent = parent;
        //this.allowed = true;
    }

    /**
     * Renders and returns PlaySection DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        this.playElement = document.createElement('div');
        this.attrs = {
            title: 'Play',
            href: '/menu'
        };
        //---------ссылка для теста
        //TODO: ссылка для теста (генерится из шаблона)
        this.playElement.innerHTML = generatePlay({'attrs': this.attrs});
        this.sign();
        return this.playElement;
    }

    allowed() {
        User.isAuthorized();
        return true;
    }

    sign() {

    }
}
