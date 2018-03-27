import Button from '../../blocks/button.js';
import Section from '../baseView.js';
import UserController from '../../../modules/userController.js';
import sectionSwitcher from '../../../application.js';
import bus from "../../../modules/bus.js";

/**
 * Class represents Section with Menu buttons
 */
export default class MenuSection extends Section {
    /**
     * Creates generic section
     */
    constructor(){
        super();
    }

    /**
     * Renders and returns MenuSection DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        this.menu = document.createElement('div');
        this.attrs =[];
        UserController.checkAuth( (isAuth) => {
            if (!isAuth) {
                // sectionSwitcher.changeSection('playSection', root); // обернуть кнопку секцией

            } else {

            }
        });

        // this.singleplayerButton = new Button('button', 'Singleplayer');
        // this.multiplayerButton = new Button('button', 'Multiplayer');
        //
        // this.profileButton = new Button('button', 'Profile');
        // this.profileButton.setOnClick(() => {
        //     sectionSwitcher.changeSection('profileSection', root);
        // });
        //
        // this.leaderboardButton = new Button('button', 'Leaderboard');
        // this.leaderboardButton.setOnClick(() => {
        //     sectionSwitcher.changeSection('ratingSection', root);
        // });
        //
        // this.logoutButton = new Button('button', 'Log Out');
        // this.logoutButton.setOnClick(() => {
        //     UserController.logout( (err, resp ) => {
        //         if (err) {
        //             console.error(err);
        //             return;
        //         }
        //         console.log(err, resp);
        //
        //     })
        // });
        //
        // this.menu = document.createElement('div');
        // this.menu.appendChild(this.singleplayerButton.render());
        // this.menu.appendChild(this.multiplayerButton.render());
        // this.menu.appendChild(this.profileButton.render());
        // this.menu.appendChild(this.leaderboardButton.render());
        // this.menu.appendChild(this.logoutButton.render());
        this.attrs = [
            {
                title: "profile",
                href: '/profle'
            },

            {
                title: "rating",
                href: '/rating'
            }
        ];

        this.menu.innerHTML = generateMenu({'attrs': this.attrs});
        return this.menu;
    }

    sign() {
        bus.on('user:authorized', ((data) => {
            this.show();
        }));

        bus.on('user:unauthorized', ((data) => {
            this.hide();
        }));

        bus.on('menu:hide', ((data) => {
            this.hide();
        }));
    }

    hide() {
        this.menu.setAttribute("hidden", "hidden");
    }

    show() {
        this.menu.removeAttribute("hidden");
    }
}
