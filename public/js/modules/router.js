import {sectionSwitcher} from "./sectionSwitcher.js";

export default class Router {

    constructor(root) {

        if (Router.__instance) {
            return Router.__instance;
        }

        this.root = root;
        this.map = {};
        this.active = null;

        Router.__instance = this;
    }

    add(path, View) {
        this.map[path] = new View(this.root);
        return this;
    }

    open(path) {
        const view = this.map[path];

        console.log("view ", path, "is allowed: ", view.allowed());
        if (!view.allowed()) {
            window.history.replaceState(null, '', '/');
            this.open('/');
            return;
        }
        if (window.location.pathname !== path) {
            window.history.pushState(null, '', path);
        }
        sectionSwitcher.changeSection(view.render(), this.root);
    }

    start() {
        window.addEventListener('popstate', function () {
            this.open(window.location.pathname);
        }.bind(this));

        this.root.addEventListener('click', function (evt) {
            if (evt.target.tagName.toLowerCase() === 'a') {
                evt.preventDefault();
                window.history.pushState(null, '', evt.target.href);
                this.open(evt.target.pathname);
            }
        }.bind(this));
        console.log(window.location.pathname);
        this.open(window.location.pathname);
    }
}
//TODO может как-то переделаем роутер, чтобы он хранил объект класса