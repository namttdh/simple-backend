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

export class ExpressProvider {
  constructor() {
    Container.register(IControllerResolveName, {useClass: ControllerResolve});
    Container.register(IRouteResolveName, {useClass: RouteResolve});
    Container.register(IMiddlewareResolveName, {useClass: MiddlewareResolve});
    Container.register(IDecoratorDataName, {useClass: DecoratorData});
    Container.register(IWebServiceName, {useClass: ExpressWebService});
  }
}
