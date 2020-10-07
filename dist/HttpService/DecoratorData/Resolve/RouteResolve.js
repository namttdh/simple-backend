"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteResolve = void 0;
const Injectable_1 = require("../../../Container/Decorator/Injectable");
const RouteBuilder_1 = require("../Builder/RouteBuilder");
const argumentHelper_1 = require("../../../BasicDecorator/Argument/argumentHelper");
const Helper_1 = require("../../../Helper");
const Route_1 = require("../../../BasicDecorator/Route");
let RouteResolve = class RouteResolve {
    constructor() {
        this.middleware = new Map();
    }
    resolve(controller) {
        let routeBuilders = new Array();
        //get list route
        const routes = Helper_1.getMetadata(Route_1.ROUTES_DECORATOR_KEY, controller);
        //get list method have params decorator
        const methods = Helper_1.getMetadata(argumentHelper_1.ARGUMENT_DECORATOR_KEY, controller);
        if (routes) {
            routes.forEach((route) => {
                let routeBuilder = new RouteBuilder_1.RouteBuilder();
                routeBuilder
                    .setMethod(route.requestMethod)
                    .setPath(route.path)
                    .setFunctionName(route.methodName)
                    .setResponseCode(route.responseCode)
                    .addMiddleware(this.middleware.get(route.methodName));
                if (methods) {
                    let params = methods.get(route.methodName);
                    if (params) {
                        routeBuilder.addParam(params);
                    }
                }
                routeBuilders.push(routeBuilder);
            });
        }
        return routeBuilders;
    }
    attachMiddleware(middleware) {
        this.middleware = middleware;
        return this;
    }
};
RouteResolve = __decorate([
    Injectable_1.Injectable()
], RouteResolve);
exports.RouteResolve = RouteResolve;
