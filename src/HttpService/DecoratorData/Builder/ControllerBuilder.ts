import {IControllerBuilder} from '../Constract/Builder/IControllerBuilder';
import {IRouteBuilder} from '../Constract/Builder/IRouteBuilder';

export class ControllerBuilder implements IControllerBuilder {
  private route: Array<any> = [];
  private middleware?: Array<any>;
  private path?: string;
  private controllerClass: any;

  addMiddleware(middleware: any | Array<any>): IControllerBuilder {
    if (!this.middleware) {
      this.middleware = [];
    }

    if (Array.isArray(middleware)) {
      this.middleware = [...this.middleware, ...middleware];
    } else {
      this.middleware.push(middleware);
    }

    return this;
  }

  getMiddleware(): Array<any> {
    return this.middleware ?? [];
  }

  setPath(path: string): IControllerBuilder {
    this.path = path;

    return this;
  }

  getPath(): string {
    return this.path ?? '';
  }

  setRoute(route: IRouteBuilder | IRouteBuilder[]): IControllerBuilder {
    if (Array.isArray(route)) {
      this.route = [...this.route, ...route];
    } else {
      this.route.push(route);
    }

    return this;
  }

  getRoute(): IRouteBuilder[] {
    return this.route ?? [];
  }

  getControllerClass(): any {
    return this.controllerClass;
  }

  setControllerClass(controller: any): IControllerBuilder {
    this.controllerClass = controller;

    return this;
  }
}
