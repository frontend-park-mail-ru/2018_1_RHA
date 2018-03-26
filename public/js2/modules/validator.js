/**
 * Class represents set of tools to validate forms
 */
export default class Validator {

    /**
     * Validation of Email input
     * @param emailElem
     */
    static checkMail(emailElem) {

        const email = emailElem.getData();
        const pattern = /([\w\.-]+)@([\w\.-]+)(\.[\w\.]+)/;
        if (pattern.test(email) === false) {
            emailElem.setError("incorrect email");
        } else {
            emailElem.setError(null);
        }
    }

    /**
     * Validation of Name input
     * @param nameElem
     */
    static checkName(nameElem) {
        const name = nameElem.getData();
        const pattern = /^[a-z0-9_-]{3,16}$/;
        if (pattern.test(name)) {
            nameElem.setError(null);
        } else {
            nameElem.setError("incorrect name");
        }
    }

    /**
     * Validation of Password input
     * @param passElem
     */
    static ckeckPass(passElem) {
        const pass = passElem.getData();
        if (pass.length < 8) {
            passElem.setError("too short password");
        } else {
            passElem.setError(null);
        }
    }

    /**
     * Validation of PasswordConfirm input
     * @param passElem
     * @param confElem
     */
    static checkConfirm(passElem, confElem) {
        if (passElem.getData() !== confElem.getData()) {
            confElem.setError("passwords do not match");
        } else {
            confElem.setError(null);
        }
    }
}