import Button from '../../blocks/button.js';
import Section from '../baseView.js';
import router from "../../../application.js";
import UserController from "../../../modules/userController.js";
import Link from "../../blocks/link/link.js";

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
    }

    /**
     * Renders and returns PlaySection DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        this.playButton = new Button('button', 'Play');
        this.playButton.setOnClick(() => {
            UserController.checkAuth((isAuthed) => {
                if (isAuthed) {
                    router.open('/menu');
                } else {
                    router.open('/login');
                }
            })
        });

        this.playElement = document.createElement('div');
        this.playElement.appendChild(this.playButton.render());
        this.playButton.appendChild(new Link('/login', 'LOGIN').render());

        //---------ссылка для теста
        //TODO: ссылка для теста (генерится из шаблона)
        this.ahref = document.createElement('div');
        this.ahref.innerHTML += generatePlay();
        this.playElement.appendChild(this.ahref);

        return this.playElement;
    }
}
