export declare const IMiddlewareResolveName = "IMiddlewareResolve";
export declare class MiddlewareResolveProps {
    private controller;
    private route;
    setController(middleware: any): MiddlewareResolveProps;
    setRoute(methodName: any, middleware: any): MiddlewareResolveProps;
    getController(): Array<any>;
    getRoute(): Map<string, any>;
}
export interface IMiddlewareResolve {
    resolve(controller: any): MiddlewareResolveProps;
}
