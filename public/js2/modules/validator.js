export default class Validator {

    static checkMail(emailElem) {

        const email = emailElem.getData();
        const pattern = /([\w\.-]+)@([\w\.-]+)(\.[\w\.]+)/;
        if (pattern.test(email) === false) {
            emailElem.setError("incorrect email");
        } else {
            emailElem.setError(null);
        }
    }

    static checkName(nameElem) {
        const name = nameElem.getData();
        const pattern = /^[a-z0-9_-]{3,16}$/;
        if (pattern.test(name)) {
            nameElem.setError(null);
        } else {
            nameElem.setError("incorrect name");
        }
    }

    static ckeckPass(passElem) {
        const pass = passElem.getData();
        if (pass.length < 8) {
            passElem.setError("too short password");
        } else {
            passElem.setError(null);
        }
    }

    static checkConfirm(passElem, confElem) {
        if (passElem.getData() !== confElem.getData()) {
            confElem.setError("passwords do not match");
        } else {
            confElem.setError(null);
        }
    }
}