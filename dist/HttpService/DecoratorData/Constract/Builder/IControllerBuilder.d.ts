import { IRouteBuilder } from './IRouteBuilder';
export interface IControllerBuilder {
    addMiddleware(middleware: any | Array<any>): IControllerBuilder;
    getMiddleware(): Array<any>;
    setPath(path: string): IControllerBuilder;
    getPath(): string;
    setRoute(route: IRouteBuilder | IRouteBuilder[]): IControllerBuilder;
    getRoute(): IRouteBuilder[];
    setControllerClass(controller: any): IControllerBuilder;
    getControllerClass(): any;
}
