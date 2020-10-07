"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = void 0;
/** get and remove metadata */
exports.getMetadata = (decoratorType, controller) => {
    const metadata = Reflect.getMetadata(decoratorType, controller);
    Reflect.deleteMetadata(decoratorType, controller);
    return metadata;
};
