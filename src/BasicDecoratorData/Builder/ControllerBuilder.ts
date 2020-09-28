import {IControllerBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IControllerBuilder';
import {IMiddlewareDefinition} from '@Core/BasicDecorator/Constract/IMiddlewareDefinition';
import {IRouteBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IRouteBuilder';

export class ControllerBuilder implements IControllerBuilder {
  private route: Array<any> = [];
  private middleware?: Array<any>;
  private path?: string;

  addMiddleware(middleware: IMiddlewareDefinition | IMiddlewareDefinition[]): IControllerBuilder {
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

  getMiddleware(): IMiddlewareDefinition[] {
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
}
