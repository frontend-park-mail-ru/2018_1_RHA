"use strict";

class Validator {
    static checkName(name) {
        return name !== undefined;
    }

    static checkEmail(email) {
        return email !== undefined;
    }

    static checkPassword(pass, confpass) {
        return (pass.length >= 8 && pass === confpass);
    }
}