import {IMiddlewareDefinition} from '@Core/BasicDecorator/Constract/IMiddlewareDefinition';
import {IRouteBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IRouteBuilder';

export interface IControllerBuilder {
  addMiddleware(middleware: IMiddlewareDefinition | IMiddlewareDefinition[]): IControllerBuilder;

  getMiddleware(): IMiddlewareDefinition[];

  setPath(path: string): IControllerBuilder;

  getPath(): string;

  setRoute(route: IRouteBuilder | IRouteBuilder[]): IControllerBuilder;

  getRoute(): IRouteBuilder[];
}
