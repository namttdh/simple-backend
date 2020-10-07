"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setArgumentMetadata = exports.ARGUMENT_DECORATOR_KEY = void 0;
exports.ARGUMENT_DECORATOR_KEY = Symbol('list_params');
exports.setArgumentMetadata = (paramsType, target, propertyKey, parameterIndex, objectTransfer) => {
    var _a, _b;
    const methods = (_a = Reflect.getMetadata(exports.ARGUMENT_DECORATOR_KEY, target.constructor)) !== null && _a !== void 0 ? _a : new Map();
    const params = (_b = methods.get(propertyKey)) !== null && _b !== void 0 ? _b : [];
    params.unshift({
        index: parameterIndex,
        type: paramsType,
        methodName: propertyKey,
        objectTransfer,
    });
    methods.set(propertyKey, params);
    Reflect.defineMetadata(exports.ARGUMENT_DECORATOR_KEY, methods, target.constructor);
};
