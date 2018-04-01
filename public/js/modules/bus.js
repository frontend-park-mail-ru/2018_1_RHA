'use strict';

/**
 * Модуль event-bus медиатора
 * @module EventBus
 */
class Bus {
    /**
     * @constructor
     */
    constructor() {
        if (Bus.__instance) {
            return Bus.__instance;
        }
        this.listeners = {};
        Bus.__instance = this;
    }

    /**
     * Зарегистрировать обработчик события
     * @param {string} event - название события
     * @param {function} listener - обработчик события
     * @return {function(this:Bus)} - функция отписки от события
     */
    on(event, listener) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(listener);
        return (() => {
            this.off(event, listener);
        });
    }

    /**
     * Отписаться от события
     * @param {string} event - название события
     * @param {function} listener - обработчик события
     */
    off(event, listener) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event] = this.listeners[event]
                .filter((element) => {
                    return element !== listener;
                });
        }
    }

    /**
     * Заэмиттить событие
     * @param {string} event - название события
     * @param {*} [payload] - объект с данными
     */
    emit(event, payload) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => {
                listener({
                    event: event,
                    payload: payload,
                });
            });
        }
    }
}

export default new Bus();
