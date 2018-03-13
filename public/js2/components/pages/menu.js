import Button from '../blocks/button.js';
import Section from './section.js';
import SectionSwitcher from '../../modules/sectionSwitcher.js';

class MenuSection extends Section {
    constructor(){
        super();
    }

    render() {
        this.singleplayerButton = new Button('button', 'Singleplayer');
        this.multiplayerButton = new Button('button', 'Multiplayer');

        this.profileButton = new Button('button', 'Profile');
        this.profileButton.setOnClick(() => {
            SectionSwitcher.changeSection('profileSection', 'root1');
        });

        this.leaderboardButton = new Button('button', 'Leaderboard');
        this.leaderboardButton.setOnClick(() => {
            SectionSwitcher.changeSection('leaderboardSection', 'root1');
        });

        this.logoutButton = new Button('button', 'Log Out');
        this.logoutButton.setOnClick(() => {
            SectionSwitcher.changeSection('playSection', 'root1'); // обернуть кнопку секцией
        });

        this.menu = document.createElement('div');
        this.menu.classList.add('menu');
        this.menu.appendChild(this.singleplayerButton);
        this.menu.appendChild(this.multiplayerButton);
        this.menu.appendChild(this.profileButton);
        this.menu.appendChild(this.leaderboardButton);
        this.menu.appendChild(this.logoutButton);

        return this.menu;
    }
}

export default MenuSection;