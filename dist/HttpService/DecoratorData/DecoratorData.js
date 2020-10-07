"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorData = void 0;
const Inject_1 = require("../../Container/Decorator/Inject");
const IControllerResolve_1 = require("./Constract/Resolve/IControllerResolve");
const IRouteResolve_1 = require("./Constract/Resolve/IRouteResolve");
const IMiddlewareResolve_1 = require("./Constract/Resolve/IMiddlewareResolve");
const Singleton_1 = require("../../Container/Decorator/Singleton");
let DecoratorData = class DecoratorData {
    constructor(controllerResolve, routeResolve, middlewareResolve) {
        this.controllerResolve = controllerResolve;
        this.routeResolve = routeResolve;
        this.middlewareResolve = middlewareResolve;
        this.listController = [];
    }
    get() {
        this.checkListControllerEmpty();
        const controllerBuilders = new Array();
        this.listController.forEach((controller) => {
            //resolve instance for middle both controller and route
            const middlewareResolve = this.middlewareResolve.resolve(controller);
            //resolve controller builder
            const controllerBuilder = this.controllerResolve
                .attachMiddleware(middlewareResolve.getController())
                .resolve(controller);
            //resolve route builder
            const routeBuilders = this.routeResolve.attachMiddleware(middlewareResolve.getRoute()).resolve(controller);
            //set route builder to controller builder
            controllerBuilder.setRoute(routeBuilders);
            //set to global builder
            controllerBuilders.push(controllerBuilder);
        });
        return controllerBuilders;
    }
    addController(controller) {
        if (Array.isArray(controller)) {
            this.listController = [this.listController, ...controller];
        }
        else {
            this.listController.push(controller);
        }
        return this;
    }
    checkListControllerEmpty() {
        if (!this.listController || this.listController.length === 0) {
            console.log('\x1b[31m%s\x1b[0m', 'Controllers not found. Register those by addController');
            process.exit();
        }
    }
};
DecoratorData = __decorate([
    Singleton_1.Singleton(),
    __param(0, Inject_1.Inject(IControllerResolve_1.IControllerResolveName)),
    __param(1, Inject_1.Inject(IRouteResolve_1.IRouteResolveName)),
    __param(2, Inject_1.Inject(IMiddlewareResolve_1.IMiddlewareResolveName)),
    __metadata("design:paramtypes", [Object, Object, Object])
], DecoratorData);
exports.DecoratorData = DecoratorData;
