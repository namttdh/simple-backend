import {ControllerResolve} from '../../../src/HttpService/DecoratorData/Resolve/ControllerResolve';
import {RouteResolve} from '../../../src/HttpService/DecoratorData/Resolve/RouteResolve';
import {DecoratorData} from '../../../src/HttpService/DecoratorData';
import {MiddlewareResolve} from '../../../src/HttpService/DecoratorData/Resolve/MiddlewareResolve';
import {Middleware} from '../../../src/BasicDecorator/Middleware';
import HttpMethod from '../../../src/Constant/HttpMethod';
import {ParamsType} from '../../../src/Constant/ParamsType';
import {Container} from '../../../src/Container';
import {Controller} from '../../../src/BasicDecorator/Controller';
import {Route} from '../../../src/BasicDecorator/Route';
import {Request} from '../../../src/BasicDecorator/Argument/Request';
import {Response} from '../../../src/BasicDecorator/Argument/Response';

describe('Test get data from decorator', () => {
  Container.register('middleware1', {useValue: 'middleware1'});
  Container.register('middleware2', {useValue: 'middleware2'});
  Container.register('middleware3', {useValue: 'middleware3'});
  Container.register('middleware4', {useValue: 'middleware4'});

  @Controller('test_prefix')
  @Middleware('middleware1')
  @Middleware('middleware2')
  class TestController {
    @Middleware('middleware3')
    @Middleware('middleware4')
    @Route({path: 'test_route_one', method: HttpMethod.POST, responseCode: 100})
    async test_route_one(@Request request: any): Promise<any> {
      //
    }
    @Route({path: 'test_route_two'})
    async test_route_two(another_value: string, @Response response: any): Promise<any> {
      //
    }
  }

  it('Test get full data using decorator', async () => {
    const basicDecoratorData = new DecoratorData(new ControllerResolve(), new RouteResolve(), new MiddlewareResolve());
    let result = basicDecoratorData.addController(TestController).get();

    expect(result).toHaveLength(1);
    expect(result[0].getPath()).toBe('/test_prefix');
    expect(result[0].getMiddleware()[0]).toBe('middleware1');
    expect(result[0].getMiddleware()[1]).toBe('middleware2');
    expect(result[0].getRoute()).toHaveLength(2);
    expect(result[0].getRoute()[0].getMiddleware()[0]).toBe('middleware3');
    expect(result[0].getRoute()[0].getMiddleware()[1]).toBe('middleware4');
    expect(result[0].getRoute()[0].getFunctionName()).toBe('test_route_one');
    expect(result[0].getRoute()[0].getPath()).toBe('/test_route_one');
    expect(result[0].getRoute()[0].getMethod()).toBe(HttpMethod.POST);
    expect(result[0].getRoute()[0].getResponseCode()).toBe(100);
    expect(result[0].getRoute()[0].getParams()).toHaveLength(1);
    expect(result[0].getRoute()[0].getParams()[0].type).toBe(ParamsType.REQUEST);
    expect(result[0].getRoute()[1].getParams()[0].type).toBe(ParamsType.RESPONSE);
    expect(result[0].getRoute()[1].getParams()[0].index).toBe(1);
  });
});
