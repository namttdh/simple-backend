import { IDecoratorData } from '../DecoratorData/Constract/IDecoratorData';
import { IControllerBuilder } from '../DecoratorData/Constract/Builder/IControllerBuilder';
import { Application } from 'express';
import { IRouteBuilder } from '../DecoratorData/Constract/Builder/IRouteBuilder';
import { IWebService } from '../Constract/IWebService';
export declare class ExpressWebService implements IWebService {
    private decoratorData;
    private readonly expressApplication;
    private paramRegister;
    constructor(decoratorData: IDecoratorData);
    instance(): Application;
    run(): void;
    buildController(controller: IControllerBuilder, routes: IRouteBuilder[]): void;
    private resolveRouteParams;
}
