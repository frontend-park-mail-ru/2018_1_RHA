import Section from '../baseView.js';
import User from "../../../modules/userModel.js";

export default class Game extends Section {
	constructor() {
		super();
	}

	render() {
		this.game = document.createElement('div');
		this.game.innerText = 'Hello Game!!!';
		return this.game;
	}

	allowed() {
		return User.isAuthorized();
	}
}