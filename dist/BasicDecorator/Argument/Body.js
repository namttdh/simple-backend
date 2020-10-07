"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
const argumentHelper_1 = require("./argumentHelper");
const ParamsType_1 = require("../../Constant/ParamsType");
exports.Body = (target, propertyKey, parameterIndex) => {
    const types = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    argumentHelper_1.setArgumentMetadata(ParamsType_1.ParamsType.BODY, target, propertyKey, parameterIndex, types[parameterIndex]);
};
