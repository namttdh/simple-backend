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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressWebService = void 0;
const Inject_1 = require("../../Container/Decorator/Inject");
const IDecoratorData_1 = require("../DecoratorData/Constract/IDecoratorData");
const express_1 = __importDefault(require("express"));
const customParamsResolve_1 = require("./customParamsResolve");
const StatusCode_1 = require("../../Constant/StatusCode");
const ParamsType_1 = require("../../Constant/ParamsType");
const Container_1 = require("../../Container");
const Singleton_1 = require("../../Container/Decorator/Singleton");
let ExpressWebService = class ExpressWebService {
    constructor(decoratorData) {
        this.decoratorData = decoratorData;
        this.expressApplication = express_1.default();
        this.paramRegister = customParamsResolve_1.paramsResolveWorker();
    }
    instance() {
        return this.expressApplication;
    }
    run() {
        var _a;
        //build controller, need refactor to multiple class
        let controllerBuilder = this.decoratorData.get();
        controllerBuilder.forEach((controller) => {
            this.buildController(controller, controller.getRoute());
        });
        //start service
        this.instance().listen((_a = process.env.APPLICATION_PORT) !== null && _a !== void 0 ? _a : 3000, () => {
            console.log('\x1b[32m%s\x1b[0m', 'Application running');
        });
    }
    buildController(controller, routes) {
        const controllerInstance = Container_1.Container.resolve(controller.getControllerClass());
        routes.forEach((route) => {
            let paramsSort = route.getParams();
            this.instance()[route.getMethod()](controller.getPath() + route.getPath(), route.getMiddleware(), (request, response, next) => __awaiter(this, void 0, void 0, function* () {
                let params = [];
                for (const param of paramsSort) {
                    params[param.index] = yield this.resolveRouteParams(param, request, response);
                }
                try {
                    let result = yield controllerInstance[route.getFunctionName()].apply(controllerInstance, params);
                    if (!response.headersSent) {
                        response.status(route.getResponseCode()).send(result);
                    }
                }
                catch (e) {
                    console.log(e);
                    response.status(StatusCode_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: true, message: 'server error' });
                }
            }));
        });
    }
    resolveRouteParams(paramDefinition, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (paramDefinition.type) {
                case ParamsType_1.ParamsType.REQUEST:
                    return request;
                case ParamsType_1.ParamsType.RESPONSE:
                    return response;
                default:
                    let resolver = this.paramRegister.get(paramDefinition.type);
                    if (resolver) {
                        return yield new resolver().resolve(request, response, paramDefinition.objectTransfer);
                    }
                    return undefined;
            }
        });
    }
};
ExpressWebService = __decorate([
    Singleton_1.Singleton(),
    __param(0, Inject_1.Inject(IDecoratorData_1.IDecoratorDataName)),
    __metadata("design:paramtypes", [Object])
], ExpressWebService);
exports.ExpressWebService = ExpressWebService;
