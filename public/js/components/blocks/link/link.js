import Block from "../block.js";

export default class Link extends Block {
    constructor(path, value) {
        super();
        this.path = path;
        this.value = value;
    }

    render() {
        this.block = document.createElement('div');
        this.block.innerHTML = generateLink({
            "path": this.path,
            "value": this.value
        });
        return this.block;
    }
}