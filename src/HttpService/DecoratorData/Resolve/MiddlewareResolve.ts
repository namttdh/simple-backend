import crypto from 'crypto';
import {Injectable} from '../../../Container/Decorator/Injectable';
import {IMiddlewareResolve, MiddlewareResolveProps} from '../Constract/Resolve/IMiddlewareResolve';
import {getMetadata} from '../../../Helper';
import {MIDDLEWARE_DECORATOR_KEY} from '../../../BasicDecorator/Middleware';
import {IMiddlewareDefinition} from '../../../BasicDecorator/Constract/IMiddlewareDefinition';
import {Container} from '../../../Container';

@Injectable()
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
    let middlewareFunction = null;
    if (!this.instanceMiddleware.get(middlewareKey)) {
      if (
        typeof middlewareDefinition.middleware === 'string' ||
        Reflect.getMetadata(MIDDLEWARE_DECORATOR_KEY, middlewareDefinition.middleware)
      ) {
        //if middleware is from ioc or set class directly
        let middlewareInstance: any = Container.resolve(middlewareDefinition.middleware as any);

        if (!middlewareInstance['_apply']) {
          //case middleware is alias string
          middlewareFunction = middlewareInstance;
        } else {
          //case middleware is class with decorate @Middleware
          middlewareFunction = middlewareInstance['_apply'].bind(middlewareInstance);
        }
      } else {
        //case is function
        middlewareFunction = middlewareDefinition.middleware;
      }
    }

    if (middlewareFunction) {
      //check option singleton if set, then using as singleton
      if (middlewareDefinition.options?.singleton) {
        this.instanceMiddleware.set(middlewareKey, middlewareFunction);
      } else {
        return middlewareFunction;
      }
    }

    return this.instanceMiddleware.get(middlewareKey);
  }
}
