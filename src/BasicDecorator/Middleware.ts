import {IMiddlewareDefinition} from './Constract/IMiddlewareDefinition';
import {Singleton} from '@Core/Container/Decorator/Singleton';

export const MIDDLEWARE_DECORATOR_KEY = Symbol('middleware_prefix');

export const Middleware = (middleware?: any): any => {
  return (target: any, propertyKey: string) => {
    if (!middleware) {
      Singleton()(target);
      Reflect.defineMetadata(MIDDLEWARE_DECORATOR_KEY, true, target);
    } else {
      const currentTarget = propertyKey ? target.constructor : target;
      const listMiddleware = (Reflect.getMetadata(MIDDLEWARE_DECORATOR_KEY, currentTarget) as IMiddlewareDefinition[]) ?? [];

      if (!Array.isArray(middleware)) {
        middleware = [middleware];
      }

      middleware.forEach((middle: any) => {
        listMiddleware.unshift({
          middleware: middle,
          methodName: propertyKey ?? undefined,
        });
      });

      Reflect.defineMetadata(MIDDLEWARE_DECORATOR_KEY, listMiddleware, currentTarget);
    }
  };
};
