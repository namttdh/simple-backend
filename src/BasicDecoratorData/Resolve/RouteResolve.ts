import {IRouteResolve} from '@Core/BasicDecoratorData/Constract/Resolve/IRouteResolve';
import {IRouteBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IRouteBuilder';
import {getMetadata} from '@Core/Helper.js';
import {PARAMS_DECORATOR_KEY} from '@Core/BasicDecorator/paramsHelper';
import {ROUTES_DECORATOR_KEY} from '@Core/BasicDecorator/Route';
import {IRouteDefinition} from '@Core/BasicDecorator/Constract/IRouteDefinition';
import {IParamDefinition} from '@Core/BasicDecorator/Constract/IParamDefinition';
import {RouteBuilder} from '@Core/BasicDecoratorData/Builder/RouteBuilder';

export class RouteResolve implements IRouteResolve {
  resolve(controller: any): IRouteBuilder[] {
    let routeBuilders = new Array<IRouteBuilder>();
    //get list route
    const routes = getMetadata(ROUTES_DECORATOR_KEY, controller) as Array<IRouteDefinition>;

    //get list method have params decorator
    const methods = getMetadata(PARAMS_DECORATOR_KEY, controller) as Map<string | symbol, Array<IParamDefinition>>;

    if (routes) {
      routes.forEach((route) => {
        let routeBuilder = new RouteBuilder();
        routeBuilder
          .setMethod(route.requestMethod)
          .setPath(route.path)
          .setFunctionName(route.methodName)
          .setResponseCode(route.responseCode);

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
}
