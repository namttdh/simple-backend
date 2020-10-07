"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerResolve = void 0;
const Injectable_1 = require("../../../Container/Decorator/Injectable");
const ControllerBuilder_1 = require("../Builder/ControllerBuilder");
const Helper_1 = require("../../../Helper");
const Controller_1 = require("../../../BasicDecorator/Controller");
let ControllerResolve = class ControllerResolve {
    constructor() {
        this.middleware = [];
    }
    resolve(controller) {
        const controllerBuilder = new ControllerBuilder_1.ControllerBuilder();
        const path = Helper_1.getMetadata(Controller_1.CONTROLLER_DECORATOR_KEY, controller);
        controllerBuilder.setPath(path);
        controllerBuilder.addMiddleware(this.middleware);
        controllerBuilder.setControllerClass(controller);
        return controllerBuilder;
    }
    attachMiddleware(middleware) {
        this.middleware = middleware;
        return this;
    }
};
ControllerResolve = __decorate([
    Injectable_1.Injectable()
], ControllerResolve);
exports.ControllerResolve = ControllerResolve;
