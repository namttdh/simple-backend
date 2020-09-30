import {
  IMiddlewareResolve,
  MiddlewareResolveProps,
} from '@Core/HttpService/DecoratorData/Constract/Resolve/IMiddlewareResolve';
import {IMiddlewareDefinition} from '@Core/BasicDecorator/Constract/IMiddlewareDefinition';
import {MIDDLEWARE_DECORATOR_KEY} from '@Core/BasicDecorator/Middleware';
import crypto from 'crypto';
import {getMetadata} from '@Core/Helper';
import {Container} from '@Core/Container';

export class MiddlewareResolve implements IMiddlewareResolve {
  private readonly instanceMiddleware: Map<string, any> = new Map();

  resolve(controller: any): MiddlewareResolveProps {
    let middlewareResolveProps = new MiddlewareResolveProps();
    const listMiddleware = (getMetadata(MIDDLEWARE_DECORATOR_KEY, controller) as IMiddlewareDefinition[]) ?? [];
    listMiddleware.forEach((middlewareDefinition) => {
      //resolve middleware always singleton
      let middlewareInstance = this.resolveSingleton(middlewareDefinition);
      if (middlewareDefinition.methodName) {
        //if method name then add to router
        middlewareResolveProps.setRoute(middlewareDefinition.methodName, middlewareInstance);
      } else {
        //else it middleware is for controller
        middlewareResolveProps.setController(middlewareInstance);
      }
    });

    return middlewareResolveProps;
  }

  private resolveSingleton(middlewareDefinition: IMiddlewareDefinition) {
    let middlewareKey = crypto.createHash('md5').update(middlewareDefinition.middleware.toString()).digest('hex');
    if (!this.instanceMiddleware.get(middlewareKey)) {
      if (
        typeof middlewareDefinition.middleware === 'string' ||
        Reflect.getMetadata(MIDDLEWARE_DECORATOR_KEY, middlewareDefinition.middleware)
      ) {
        //if middleware is from ioc or set class directly
        let middlewareInstance: any = Container.resolve(middlewareDefinition.middleware as any);

        if (typeof middlewareDefinition.middleware === 'string') {
          //case middleware is alias string
          this.instanceMiddleware.set(middlewareKey, middlewareInstance);
        } else {
          //case middleware is class with decorate @Middleware
          this.instanceMiddleware.set(middlewareKey, middlewareInstance['apply']);
        }
      } else {
        //case is function
        this.instanceMiddleware.set(middlewareKey, middlewareDefinition.middleware);
      }
    }

    return this.instanceMiddleware.get(middlewareKey);
  }
}
