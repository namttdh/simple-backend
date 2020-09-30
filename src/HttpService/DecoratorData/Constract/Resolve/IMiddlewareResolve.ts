export const IMiddlewareResolveName = 'IMiddlewareResolve';

export class MiddlewareResolveProps {
  private controller: Array<any> = [];
  private route: Map<string, any> = new Map();

  public setController(middleware: any): MiddlewareResolveProps {
    this.controller.push(middleware);

    return this;
  }

  public setRoute(methodName: any, middleware: any): MiddlewareResolveProps {
    let middlewareRoutes = this.route.get(methodName) ?? [];
    middlewareRoutes.push(middleware);
    this.route.set(methodName, middlewareRoutes);

    return this;
  }

  public getController(): Array<any> {
    return this.controller;
  }

  public getRoute(): Map<string, any> {
    return this.route;
  }
}

export interface IMiddlewareResolve {
  resolve(controller: any): MiddlewareResolveProps;
}
