"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = exports.MIDDLEWARE_DECORATOR_KEY = void 0;
const Singleton_1 = require("../Container/Decorator/Singleton");
exports.MIDDLEWARE_DECORATOR_KEY = Symbol('middleware_prefix');
exports.Middleware = (middleware) => {
    return (target, propertyKey) => {
        var _a;
        if (!middleware) {
            Singleton_1.Singleton()(target);
            Reflect.defineMetadata(exports.MIDDLEWARE_DECORATOR_KEY, true, target);
        }
        else {
            const currentTarget = propertyKey ? target.constructor : target;
            const listMiddleware = (_a = Reflect.getMetadata(exports.MIDDLEWARE_DECORATOR_KEY, currentTarget)) !== null && _a !== void 0 ? _a : [];
            if (!Array.isArray(middleware)) {
                middleware = [middleware];
            }
            middleware.forEach((middle) => {
                listMiddleware.unshift({
                    middleware: middle,
                    methodName: propertyKey !== null && propertyKey !== void 0 ? propertyKey : undefined,
                });
            });
            Reflect.defineMetadata(exports.MIDDLEWARE_DECORATOR_KEY, listMiddleware, currentTarget);
        }
    };
};
