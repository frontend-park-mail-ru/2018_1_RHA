import Section from '../baseView.js';
import bus from "../../../modules/bus.js";
import router from "../../../application.js";

/**
 * Class represents Section with Menu buttons
 */
export default class MenuSection extends Section {
    /**
     * Creates generic section
     */
    constructor(){
        super();
        this.allowed = false;
        console.log(this.allowed);
        this.sign();
        console.log(this.allowed);
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
                href: '/profle'
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

    sign() {
        bus.on('user:authorized', ((data) => {
            this.allowed = true;
            router.open('/menu');
        }));

        bus.on('user:unauthorized', ((data) => {
            this.allowed = false;
        }));

        bus.on('menu:hide', ((data) => {
            this.hide();
        }));
    }

    hide() {
        this.menu.setAttribute("hidden", "hidden");
    }
}
