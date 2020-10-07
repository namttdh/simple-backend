"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const argumentHelper_1 = require("./argumentHelper");
const ParamsType_1 = require("../../Constant/ParamsType");
exports.Response = (target, propertyKey, parameterIndex) => {
    argumentHelper_1.setArgumentMetadata(ParamsType_1.ParamsType.RESPONSE, target, propertyKey, parameterIndex);
};
