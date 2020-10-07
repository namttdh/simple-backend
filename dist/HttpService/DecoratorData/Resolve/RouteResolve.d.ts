import { IRouteResolve } from '../Constract/Resolve/IRouteResolve';
import { IRouteBuilder } from '../Constract/Builder/IRouteBuilder';
export declare class RouteResolve implements IRouteResolve {
    private middleware;
    resolve(controller: any): IRouteBuilder[];
    attachMiddleware(middleware: Map<string, any>): IRouteResolve;
}
