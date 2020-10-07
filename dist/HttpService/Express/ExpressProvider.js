"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressProvider = void 0;
const Container_1 = require("../../Container");
const IControllerResolve_1 = require("../DecoratorData/Constract/Resolve/IControllerResolve");
const IMiddlewareResolve_1 = require("../DecoratorData/Constract/Resolve/IMiddlewareResolve");
const ControllerResolve_1 = require("../DecoratorData/Resolve/ControllerResolve");
const RouteResolve_1 = require("../DecoratorData/Resolve/RouteResolve");
const IRouteResolve_1 = require("../DecoratorData/Constract/Resolve/IRouteResolve");
const MiddlewareResolve_1 = require("../DecoratorData/Resolve/MiddlewareResolve");
const IDecoratorData_1 = require("../DecoratorData/Constract/IDecoratorData");
const DecoratorData_1 = require("../DecoratorData");
const IWebService_1 = require("../Constract/IWebService");
const ExpressWebService_1 = require("./ExpressWebService");
class ExpressProvider {
    constructor() {
        Container_1.Container.registerSingleton(IControllerResolve_1.IControllerResolveName, ControllerResolve_1.ControllerResolve);
        Container_1.Container.registerSingleton(IRouteResolve_1.IRouteResolveName, RouteResolve_1.RouteResolve);
        Container_1.Container.registerSingleton(IMiddlewareResolve_1.IMiddlewareResolveName, MiddlewareResolve_1.MiddlewareResolve);
        Container_1.Container.registerSingleton(IDecoratorData_1.IDecoratorDataName, DecoratorData_1.DecoratorData);
        Container_1.Container.registerSingleton(IWebService_1.IWebServiceName, ExpressWebService_1.ExpressWebService);
    }
}
exports.ExpressProvider = ExpressProvider;
