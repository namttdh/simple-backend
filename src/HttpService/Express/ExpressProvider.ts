import {Container} from '../../Container';
import {IControllerResolveName} from '../DecoratorData/Constract/Resolve/IControllerResolve';
import {IMiddlewareResolveName} from '../DecoratorData/Constract/Resolve/IMiddlewareResolve';
import {ControllerResolve} from '../DecoratorData/Resolve/ControllerResolve';
import {RouteResolve} from '../DecoratorData/Resolve/RouteResolve';
import {IRouteResolveName} from '../DecoratorData/Constract/Resolve/IRouteResolve';
import {MiddlewareResolve} from '../DecoratorData/Resolve/MiddlewareResolve';
import {IDecoratorDataName} from '../DecoratorData/Constract/IDecoratorData';
import {DecoratorData} from '../DecoratorData';
import {IWebServiceName} from '../Constract/IWebService';
import {ExpressWebService} from './ExpressWebService';
import {IParamResolveWorkerName} from '../Constract/IParamResolveWorker';
import {paramsResolveWorker} from './customParamsResolve';

export class ExpressProvider {
  constructor() {
    Container.registerSingleton(IControllerResolveName, ControllerResolve);
    Container.registerSingleton(IRouteResolveName, RouteResolve);
    Container.registerSingleton(IMiddlewareResolveName, MiddlewareResolve);
    Container.registerSingleton(IDecoratorDataName, DecoratorData);
    Container.registerSingleton(IWebServiceName, ExpressWebService);
    Container.register(IParamResolveWorkerName, {
      useValue: paramsResolveWorker(),
    });
  }
}
