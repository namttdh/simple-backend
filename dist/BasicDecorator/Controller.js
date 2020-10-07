"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.CONTROLLER_DECORATOR_KEY = void 0;
const Singleton_1 = require("../Container/Decorator/Singleton");
exports.CONTROLLER_DECORATOR_KEY = Symbol('controller_prefix');
exports.Controller = (prefix = '') => {
    prefix = prefix[0] === '/' ? prefix : '/' + prefix;
    return (target) => {
        Singleton_1.Singleton()(target);
        Reflect.defineMetadata(exports.CONTROLLER_DECORATOR_KEY, prefix, target);
    };
};
