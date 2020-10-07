"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareResolve = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Injectable_1 = require("../../../Container/Decorator/Injectable");
const IMiddlewareResolve_1 = require("../Constract/Resolve/IMiddlewareResolve");
const Helper_1 = require("../../../Helper");
const Middleware_1 = require("../../../BasicDecorator/Middleware");
const Container_1 = require("../../../Container");
let MiddlewareResolve = class MiddlewareResolve {
    constructor() {
        this.instanceMiddleware = new Map();
    }
    resolve(controller) {
        var _a;
        let middlewareResolveProps = new IMiddlewareResolve_1.MiddlewareResolveProps();
        const listMiddleware = (_a = Helper_1.getMetadata(Middleware_1.MIDDLEWARE_DECORATOR_KEY, controller)) !== null && _a !== void 0 ? _a : [];
        listMiddleware.forEach((middlewareDefinition) => {
            //resolve middleware always singleton
            let middlewareInstance = this.resolveSingleton(middlewareDefinition);
            if (middlewareDefinition.methodName) {
                //if method name then add to router
                middlewareResolveProps.setRoute(middlewareDefinition.methodName, middlewareInstance);
            }
            else {
                //else it middleware is for controller
                middlewareResolveProps.setController(middlewareInstance);
            }
        });
        return middlewareResolveProps;
    }
    resolveSingleton(middlewareDefinition) {
        let middlewareKey = crypto_1.default.createHash('md5').update(middlewareDefinition.middleware.toString()).digest('hex');
        if (!this.instanceMiddleware.get(middlewareKey)) {
            if (typeof middlewareDefinition.middleware === 'string' ||
                Reflect.getMetadata(Middleware_1.MIDDLEWARE_DECORATOR_KEY, middlewareDefinition.middleware)) {
                //if middleware is from ioc or set class directly
                let middlewareInstance = Container_1.Container.resolve(middlewareDefinition.middleware);
                if (typeof middlewareDefinition.middleware === 'string') {
                    //case middleware is alias string
                    this.instanceMiddleware.set(middlewareKey, middlewareInstance);
                }
                else {
                    //case middleware is class with decorate @Middleware
                    this.instanceMiddleware.set(middlewareKey, middlewareInstance['apply']);
                }
            }
            else {
                //case is function
                this.instanceMiddleware.set(middlewareKey, middlewareDefinition.middleware);
            }
        }
        return this.instanceMiddleware.get(middlewareKey);
    }
};
MiddlewareResolve = __decorate([
    Injectable_1.Injectable()
], MiddlewareResolve);
exports.MiddlewareResolve = MiddlewareResolve;
