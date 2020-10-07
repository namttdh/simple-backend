import { IControllerBuilder } from '../Constract/Builder/IControllerBuilder';
import { IRouteBuilder } from '../Constract/Builder/IRouteBuilder';
export declare class ControllerBuilder implements IControllerBuilder {
    private route;
    private middleware?;
    private path?;
    private controllerClass;
    addMiddleware(middleware: any | Array<any>): IControllerBuilder;
    getMiddleware(): Array<any>;
    setPath(path: string): IControllerBuilder;
    getPath(): string;
    setRoute(route: IRouteBuilder | IRouteBuilder[]): IControllerBuilder;
    getRoute(): IRouteBuilder[];
    getControllerClass(): any;
    setControllerClass(controller: any): IControllerBuilder;
}
