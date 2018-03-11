"use strict";

class Validator {
    static checkName(name) {
        return name !== undefined;
    }

    static checkEmail(email) {
        const pattern = /([\w\.-]+)@([\w\.-]+)(\.[\w\.]+)/;
        if (pattern.test(email) === false) {
            return false;
        }
    }

    static checkLengthPass(pass) {
        return pass.length >=8;
    }

    static checkPassword(pass, confpass) {
        return (pass === confpass);
    }
}