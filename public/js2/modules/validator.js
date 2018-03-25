export default class Validator {
    //TODO: вызов валидатора должен быть произведен так, чтобы данные методы выдели поля коспонентов
    //TODO: на компоненты надо повесить слушатель onChange и в слушатель передать объект компонента, чтобы там обновлялся state
    //TODO: перед отправкой формы надо проверить, чтобы у всех инпутов state был true
    static checkMail(email) {
        //TODO проверить по паттерну mail и установит state на true или false
    }

    static ckeckName(name) {
        //TODO аналогично
    }

    static ckeckPass(pass) {
        //TODO аналогично
    }

    static checkConfirm(pass, conf) {
        //
    }
    //TODO если state стал true, то не забудь вызвать unsetError и захидить errorElement
    //TODO если инпут не прошел проверку, то надо утсановить ошибку, то есть текст ошибки, но разхиживтать его не надо, разхидишь только после сабмита
}