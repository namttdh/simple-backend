"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareResolveProps = exports.IMiddlewareResolveName = void 0;
exports.IMiddlewareResolveName = 'IMiddlewareResolve';
class MiddlewareResolveProps {
    constructor() {
        this.controller = [];
        this.route = new Map();
    }
    setController(middleware) {
        this.controller.push(middleware);
        return this;
    }
    setRoute(methodName, middleware) {
        var _a;
        let middlewareRoutes = (_a = this.route.get(methodName)) !== null && _a !== void 0 ? _a : [];
        middlewareRoutes.push(middleware);
        this.route.set(methodName, middlewareRoutes);
        return this;
    }
    getController() {
        return this.controller;
    }
    getRoute() {
        return this.route;
    }
}
exports.MiddlewareResolveProps = MiddlewareResolveProps;
