"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteBuilder = void 0;
const StatusCode_1 = require("../../../Constant/StatusCode");
const HttpMethod_1 = __importDefault(require("../../../Constant/HttpMethod"));
class RouteBuilder {
    constructor() {
        this.middleware = [];
        this.params = [];
        this.method = HttpMethod_1.default.GET;
        this.responseCode = StatusCode_1.StatusCodes.OK;
    }
    addMiddleware(middleware) {
        if (!middleware) {
            return this;
        }
        if (Array.isArray(middleware)) {
            this.middleware = [...this.middleware, ...middleware];
        }
        else {
            this.middleware.push(middleware);
        }
        return this;
    }
    getMiddleware() {
        var _a;
        return (_a = this.middleware) !== null && _a !== void 0 ? _a : [];
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
    getMethod() {
        return this.method;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    getPath() {
        var _a;
        return (_a = this.path) !== null && _a !== void 0 ? _a : '';
    }
    addParam(param) {
        if (Array.isArray(param)) {
            this.params = [...this.params, ...param];
        }
        else {
            this.params.push(param);
        }
        return this;
    }
    getParams() {
        return this.params;
    }
    setResponseCode(code) {
        this.responseCode = code;
        return this;
    }
    getResponseCode() {
        return this.responseCode;
    }
    setFunctionName(name) {
        this.functionName = name;
        return this;
    }
    getFunctionName() {
        var _a;
        return (_a = this.functionName) !== null && _a !== void 0 ? _a : '';
    }
}
exports.RouteBuilder = RouteBuilder;
