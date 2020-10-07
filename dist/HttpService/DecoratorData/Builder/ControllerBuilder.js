"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerBuilder = void 0;
class ControllerBuilder {
    constructor() {
        this.route = [];
    }
    addMiddleware(middleware) {
        if (!this.middleware) {
            this.middleware = [];
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
    setPath(path) {
        this.path = path;
        return this;
    }
    getPath() {
        var _a;
        return (_a = this.path) !== null && _a !== void 0 ? _a : '';
    }
    setRoute(route) {
        if (Array.isArray(route)) {
            this.route = [...this.route, ...route];
        }
        else {
            this.route.push(route);
        }
        return this;
    }
    getRoute() {
        var _a;
        return (_a = this.route) !== null && _a !== void 0 ? _a : [];
    }
    getControllerClass() {
        return this.controllerClass;
    }
    setControllerClass(controller) {
        this.controllerClass = controller;
        return this;
    }
}
exports.ControllerBuilder = ControllerBuilder;
