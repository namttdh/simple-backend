import HttpMethod from '@Core/Constant/HttpMethod';
import {IRouteDefinition} from '@Core/BasicDecorator/Constract/IRouteDefinition';
import {StatusCodes} from '@Core/Constant/StatusCode';

export const ROUTES_DECORATOR_KEY = Symbol('list_routes');

const Route = ({path, method = HttpMethod.GET, responseCode = StatusCodes.OK}: any): MethodDecorator => {
  path = path[0] === '/' ? path : '/' + path;

  return (target: any, propertyKey: string | symbol, descriptor: any): void => {
    const routes = (Reflect.getMetadata(ROUTES_DECORATOR_KEY, target.constructor) as Array<IRouteDefinition>) ?? [];

    routes.push({
      requestMethod: method,
      path,
      methodName: propertyKey,
      responseCode,
    });
    Reflect.defineMetadata(ROUTES_DECORATOR_KEY, routes, target.constructor);
  };
};

export default Route;
