"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
const argumentHelper_1 = require("./argumentHelper");
const ParamsType_1 = require("../../Constant/ParamsType");
exports.Param = (...args) => {
    if (args.length == 1) {
        return (target, propertyKey, parameterIndex) => {
            argumentHelper_1.setArgumentMetadata(ParamsType_1.ParamsType.PARAM, target, propertyKey, parameterIndex, args[0]);
        };
    }
    else {
        argumentHelper_1.setArgumentMetadata(ParamsType_1.ParamsType.PARAM, args[0], args[1], args[2], null);
    }
};
