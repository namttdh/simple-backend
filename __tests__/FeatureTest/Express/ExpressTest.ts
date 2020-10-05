import request from 'supertest';
import {IControllerResolveName} from '../../../src/HttpService/DecoratorData/Constract/Resolve/IControllerResolve';
import {IMiddlewareResolveName} from '../../../src/HttpService/DecoratorData/Constract/Resolve/IMiddlewareResolve';
import {ControllerResolve} from '../../../src/HttpService/DecoratorData/Resolve/ControllerResolve';
import {RouteResolve} from '../../../src/HttpService/DecoratorData/Resolve/RouteResolve';
import {DecoratorData} from '../../../src/HttpService/DecoratorData';
import {IRouteResolveName} from '../../../src/HttpService/DecoratorData/Constract/Resolve/IRouteResolve';
import {MiddlewareResolve} from '../../../src/HttpService/DecoratorData/Resolve/MiddlewareResolve';
import {ExpressWebService} from '../../../src/HttpService/Express';
import {Container} from '../../../src/Container';
import {Controller} from '../../../src/BasicDecorator/Controller';
import {Route} from '../../../src/BasicDecorator/Route';

describe('Express server test', () => {
  Container.register(IControllerResolveName, {useClass: ControllerResolve});
  Container.register(IRouteResolveName, {useClass: RouteResolve});
  Container.register(IMiddlewareResolveName, {useClass: MiddlewareResolve});
  @Controller('test')
  class TestController {
    @Route({path: 'test'})
    async test() {
      return 'hello world';
    }
  }

  it('Test start service express success', async () => {
    let decoratorData = Container.resolve(DecoratorData);
    decoratorData.addController(TestController);

    let expressWebService = new ExpressWebService(decoratorData);
    expressWebService.run();
    let result = await request(expressWebService.instance()).get('/test/test');
    expect(result.text).toBe('hello world');
  });
});
