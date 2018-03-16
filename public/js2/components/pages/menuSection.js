import Button from '../blocks/button.js';
import Section from './section.js';
import UserController from '../../modules/userController.js';
import sectionSwitcher from '../../application.js';

export default class MenuSection extends Section {
    constructor(){
        super();
    }

    render() {
        this.singleplayerButton = new Button('button', 'Singleplayer');
        this.multiplayerButton = new Button('button', 'Multiplayer');

        this.profileButton = new Button('button', 'Profile');
        this.profileButton.setOnClick(() => {
            //sectionSwitcher.changeSection('profileSection', 'root1'); // исправить
        });

        this.leaderboardButton = new Button('button', 'Leaderboard');
        this.leaderboardButton.setOnClick(() => {

            sectionSwitcher.changeSection('ratingSection', root);
        });

        this.logoutButton = new Button('button', 'Log Out');
        this.logoutButton.setOnClick(() => {
            UserController.logout( (err, resp ) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(err, resp);
                UserController.checkAuth( (isAuth) => {
                    if (!isAuth) {
                        sectionSwitcher.changeSection('playSection', root); // обернуть кнопку секцией
                    } else {
                        console.log('error logout');
                    }

                })
            })
        });

        this.menu = document.createElement('div');
        this.menu.appendChild(this.singleplayerButton.render());
        this.menu.appendChild(this.multiplayerButton.render());
        this.menu.appendChild(this.profileButton.render());
        this.menu.appendChild(this.leaderboardButton.render());
        this.menu.appendChild(this.logoutButton.render());

        return this.menu;
    }
}
