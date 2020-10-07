"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const argumentHelper_1 = require("./argumentHelper");
const ParamsType_1 = require("../../Constant/ParamsType");
exports.Request = (target, propertyKey, parameterIndex) => {
    argumentHelper_1.setArgumentMetadata(ParamsType_1.ParamsType.REQUEST, target, propertyKey, parameterIndex);
};
