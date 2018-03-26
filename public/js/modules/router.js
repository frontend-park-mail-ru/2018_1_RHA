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
        // const view = this.map[path];
        // if (!view || view === this.active || !view.allowed()) {
        //     return this;
        // }
        //
        // if (this.active) {
        //     this.active.destroy();
        //     this.active = null;
        // }
        //
        // this.active = view.create();
        // if (window.location.pathname !== path) {
        //     window.history.pushState(null, '', path);
        // }
        //
        // return this;

        const view = this.map[path];
        console.log(view);
        sectionSwitcher.changeSection(view, this.root);
    }

    start() {
        window.addEventListener('popstate', function () {
            this.open(window.location.pathname);
        }.bind(this));

        this.root.addEventListener('click', function (evt) {
            if (evt.target.tagName.toLowerCase() === 'a') {
                evt.preventDefault();
                this.open(evt.target.pathname);
            }
        }.bind(this));

        this.open(window.location.pathname);
    }

}