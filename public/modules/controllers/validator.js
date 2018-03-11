"use strict";

class Validator {
    static checkName(name) {
        const pattern = /^[a-z0-9_-]{3,16}$/;
        return pattern.test(name);
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