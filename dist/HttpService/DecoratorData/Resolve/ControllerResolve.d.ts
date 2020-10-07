import { IControllerResolve } from '../Constract/Resolve/IControllerResolve';
import { IControllerBuilder } from '../Constract/Builder/IControllerBuilder';
export declare class ControllerResolve implements IControllerResolve {
    private middleware;
    resolve(controller: any): IControllerBuilder;
    attachMiddleware(middleware: Array<any>): IControllerResolve;
}
