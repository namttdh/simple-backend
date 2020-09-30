import {IRouteResolve} from '@Core/HttpService/DecoratorData/Constract/Resolve/IRouteResolve';
import {IRouteBuilder} from '@Core/HttpService/DecoratorData/Constract/Builder/IRouteBuilder';
import {getMetadata} from '@Core/Helper';
import {ROUTES_DECORATOR_KEY} from '@Core/BasicDecorator/Route';
import {IRouteDefinition} from '@Core/BasicDecorator/Constract/IRouteDefinition';
import {IParamDefinition} from '@Core/BasicDecorator/Constract/IParamDefinition';
import {RouteBuilder} from '@Core/HttpService/DecoratorData/Builder/RouteBuilder';
import {ARGUMENT_DECORATOR_KEY} from '@Core/BasicDecorator/Argument/argumentHelper';

export class RouteResolve implements IRouteResolve {
  private middleware: Map<string | symbol, any> = new Map();

  resolve(controller: any): IRouteBuilder[] {
    let routeBuilders = new Array<IRouteBuilder>();
    //get list route
    const routes = getMetadata(ROUTES_DECORATOR_KEY, controller) as Array<IRouteDefinition>;

    //get list method have params decorator
    const methods = getMetadata(ARGUMENT_DECORATOR_KEY, controller) as Map<string | symbol, Array<IParamDefinition>>;

    if (routes) {
      routes.forEach((route) => {
        let routeBuilder = new RouteBuilder();
        routeBuilder
          .setMethod(route.requestMethod)
          .setPath(route.path)
          .setFunctionName(route.methodName)
          .setResponseCode(route.responseCode)
          .addMiddleware(this.middleware.get(route.methodName));

        if (methods) {
          let params = methods.get(route.methodName);
          if (params) {
            routeBuilder.addParam(params);
          }
        }

        routeBuilders.push(routeBuilder);
      });
    }
    return routeBuilders;
  }

  attachMiddleware(middleware: Map<string, any>): IRouteResolve {
    this.middleware = middleware;

    return this;
  }
}
