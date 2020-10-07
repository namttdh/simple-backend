"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsResolveWorker = void 0;
const BodyArgsResolve_1 = require("./ArgsResolve/BodyArgsResolve");
const ParamArgsResolve_1 = require("./ArgsResolve/ParamArgsResolve");
const ParamsType_1 = require("../../Constant/ParamsType");
exports.paramsResolveWorker = () => {
    const resolver = new Map();
    resolver.set(ParamsType_1.ParamsType.BODY, BodyArgsResolve_1.BodyArgsResolve);
    resolver.set(ParamsType_1.ParamsType.PARAM, ParamArgsResolve_1.ParamArgsResolve);
    return resolver;
};
