import {sectionSwitcher} from "./sectionSwitcher.js";

export default class Router {

    constructor(root) {
        this.root = root;
        this.map = {};
        this.active = null;
    }

    add(path, View) {
        this.map[path] = new View().render(this.root);
        return this;
    }

    open(path) {
        const view = this.map[path];
        window.history.pushState(null, 'link', path);
        sectionSwitcher.changeSection(view, this.root);
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