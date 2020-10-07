"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = exports.ROUTES_DECORATOR_KEY = void 0;
const HttpMethod_1 = __importDefault(require("../Constant/HttpMethod"));
const StatusCode_1 = require("../Constant/StatusCode");
exports.ROUTES_DECORATOR_KEY = Symbol('list_routes');
exports.Route = ({ path, method = HttpMethod_1.default.GET, responseCode = StatusCode_1.StatusCodes.OK }) => {
    path = path[0] === '/' ? path : '/' + path;
    return (target, propertyKey, descriptor) => {
        var _a;
        const routes = (_a = Reflect.getMetadata(exports.ROUTES_DECORATOR_KEY, target.constructor)) !== null && _a !== void 0 ? _a : [];
        routes.push({
            requestMethod: method,
            path,
            methodName: propertyKey,
            responseCode,
        });
        Reflect.defineMetadata(exports.ROUTES_DECORATOR_KEY, routes, target.constructor);
    };
};
