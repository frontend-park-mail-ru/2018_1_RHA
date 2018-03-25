export default class Validator {

    static checkMail(email) {

        const pattern = /([\w\.-]+)@([\w\.-]+)(\.[\w\.]+)/;
        if (pattern.test(email) === false) {
            return false;
        }
    }

    static checkName(name) {

        const pattern = /^[a-z0-9_-]{3,16}$/;
        return pattern.test(name);
    }

    static ckeckPass(pass) {

        return pass.length >= 8;
    }

    static checkConfirm(pass, conf) {
        return (pass === conf);
    }
}