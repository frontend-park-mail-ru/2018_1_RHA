export default class Validator {
    static checkConfirmation(password, confirm) {
        return password === confirm;
    }
}