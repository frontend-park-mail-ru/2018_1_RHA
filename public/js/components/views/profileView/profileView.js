import Section from "../baseView.js";
import ChangeForm from "../../forms/changeForm.js";
import Button from "../../blocks/button.js";
import bus from "../../../modules/bus.js";
import User from "../../../modules/userModel.js";
import Router from "../../../modules/router.js";
import LoadForm from "../../forms/loadPictureForm/loadPictureForm.js";

/**
 * Class represents Section with Profile data and Form
 */
export default class ProfileSection extends Section {
    /**
     * Creates generic Section
     */
    constructor() {
        super();
        this.sign();
    }

    /**
     * Renders and returns ProfileSection DOM element
     * @return {HTMLDivElement | *}
     */
    render() {
        this.profileElement = document.createElement('div');
        this.profileElement.classList.add('div__profile-wrapper');

        this.attrs = User.getCurUser();
        this.profileTable = document.createElement('div');
        this.profileTable.innerHTML = generateProfile({"user": this.attrs});
        this.profileElement.appendChild(this.profileTable);
        this.profileElement.appendChild(document.createElement('hr'));

        this.fileForm = new LoadForm();
        this.profileElement.appendChild(this.fileForm.render());

        this.changeForm = new ChangeForm();
        this.profileElement.appendChild(this.changeForm.render());

        this.backButt = new Button('button', 'Back', this.profileElement);
        this.backButt.setOnClick(() => {
            new Router().open('/');
        });

        this.changeForm.setOnSubmit( () => {
            const userData = this.changeForm.getData();
            const jsonUserData = JSON.stringify(userData);
            bus.emit("user:update", jsonUserData);
        });
        this.fileForm.setOnSubmit( () => {
            //TODO:
            const formData = new FormData();
            //formData.append("avatar", this.fileForm.getData().files[0]);
            //const avatar = this.fileForm.getData();
            //const jsonAvatar = JSON.stringify(avatar);
            bus.emit("user:avatarUpload", formData);
        });
        return this.profileElement;
    }

    allowed() {
        return User.isAuthorized();
    }

    sign() {
        bus.on('update:error', data => {
            this.changeForm.Email.setError(data.payload);
        })
    }
}