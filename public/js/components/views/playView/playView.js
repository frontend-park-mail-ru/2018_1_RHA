import Button from '../../blocks/button.js';
import Section from '../baseView.js';
import router from "../../../application.js";
import UserController from "../../../modules/userController.js";

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
        // this.playButton = new Button('button', 'Play');
        // this.playButton.setOnClick(() => {
        //     UserController.checkAuth((isAuthed) => {
        //         if (isAuthed) {
        //             router.open('/menu');
        //         } else {
        //             router.open('/login');
        //         }
        //     })
        // });
        //
         this.playElement = document.createElement('div');
        // this.playElement.appendChild(this.playButton.render());

        this.attrs = {
            title: 'Play',
            href: '/landing'
        };


        //---------ссылка для теста
        //TODO: ссылка для теста (генерится из шаблона)
        this.playElement.innerHTML = generatePlay({'attrs': this.attrs});
        return this.playElement;
    }
}
