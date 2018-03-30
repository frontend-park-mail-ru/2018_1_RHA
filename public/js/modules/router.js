import {sectionSwitcher} from "./sectionSwitcher.js";

export default class Router {

    constructor(root) {
        this.root = root;
        this.map = {};
        this.active = null;
    }

    add(path, View) {
        this.map[path] = new View(this.root);
        console.log(this.map[path]);
        return this;
    }

    open(path) {
        const view = this.map[path];
        if (view.allowed === false) {
            if (this.map['/'].allowed === true) {
                window.history.pushState(null, 'link', '/');
                sectionSwitcher.changeSection(this.map['/'].render(), this.root);
            }
            else {
                window.history.pushState(null, 'link', '/landing');
                sectionSwitcher.changeSection(this.map['/landing'].render(), this.root);
            }
            return;
        }
        window.history.pushState(null, 'link', path);
        sectionSwitcher.changeSection(view.render(), this.root);
    }

    start() {
        window.addEventListener('popstate', function () {
            this.open(window.location.pathname);
        }.bind(this));

        this.root.addEventListener('click', function (evt) {
            if (evt.target.tagName.toLowerCase() === 'a') {
                evt.preventDefault();
                window.history.pushState(null, 'link', evt.target.href);
                this.open(evt.target.pathname);
            }
        }.bind(this));
        console.log(window.location.pathname);
        this.open(window.location.pathname);
    }
}
//TODO может как-то переделаем роутер, чтобы он хранил объект класса