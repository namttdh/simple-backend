import { IControllerResolve } from './Constract/Resolve/IControllerResolve';
import { IRouteResolve } from './Constract/Resolve/IRouteResolve';
import { IMiddlewareResolve } from './Constract/Resolve/IMiddlewareResolve';
import { IDecoratorData } from './Constract/IDecoratorData';
import { IControllerBuilder } from './Constract/Builder/IControllerBuilder';
export declare class DecoratorData implements IDecoratorData {
    private controllerResolve;
    private routeResolve;
    private middlewareResolve;
    private listController;
    constructor(controllerResolve: IControllerResolve, routeResolve: IRouteResolve, middlewareResolve: IMiddlewareResolve);
    get(): IControllerBuilder[];
    addController(controller: any): IDecoratorData;
    private checkListControllerEmpty;
}
