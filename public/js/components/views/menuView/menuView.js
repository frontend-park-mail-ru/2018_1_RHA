import Section from '../baseView.js';
import bus from "../../../modules/bus.js";
import Router from "../../../modules/router.js";
import User from "../../../modules/userModel.js";


/**
 * Class represents Section with Menu buttons
 */
export default class MenuSection extends Section {
    /**
     * Creates generic section
     */
    constructor(){
        super();
        this.sign();
    }

    /**
     * Renders and returns MenuSection DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        this.menu = document.createElement('div');
        this.attrs = [
            {
                title: "singleplayer",
                href: '#'
            },
            {
                title: "multiplayer",
                href: '#'
            },
            {
                title: "profile",
                href: '/profile'
            },
            {
                title: "rating",
                href: '/rating'
            },
        ];
        this.logout = document.createElement('a');
        this.logout.setAttribute('href', '/');
        this.logout.innerText = 'logout';
        this.logout.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('logout', null);
        });
        this.menu.innerHTML = generateMenu({'attrs': this.attrs});
        this.menu.appendChild(this.logout);

        return this.menu;
    }

    allowed() {
        return User.isAuthorized();
    }

    sign() {
        bus.on('user:authorized', ((data) => {
            this.allow = true;
            new Router().open('/menu');
        }));

        bus.on('user:unauthorized', ((data) => {
            this.allow = false;
        }));

        bus.on('menu:hide', ((data) => {
            this.hide();
        }));
    }

    hide() {
        this.menu.setAttribute("hidden", "hidden");
    }
}
