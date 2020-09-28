import Controller from '@Core/BasicDecorator/Controller';
import Route from '@Core/BasicDecorator/Route';
import {BasicDecoratorData} from '@Core/BasicDecoratorData/BasicDecoratorData';
import {RouteResolve} from '@Core/BasicDecoratorData/Resolve/RouteResolve';
import {ControllerResolve} from '@Core/BasicDecoratorData/Resolve/ControllerResolve';
import Request from '@Core/BasicDecorator/Request';
import Response from '@Core/BasicDecorator/Response';
import HttpMethod from '@Core/Constants/HttpMethod';
import {ParamsType} from '@Core/Constants/ParamsType';

describe('Test get data from decorator', () => {
  @Controller('test_prefix')
  class TestController {
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
    const basicDecoratorData = new BasicDecoratorData(new ControllerResolve(), new RouteResolve());
    let result = basicDecoratorData.addController(TestController).get();

    expect(result).toHaveLength(1);
    expect(result[0].getPath()).toBe('/test_prefix');
    expect(result[0].getRoute()).toHaveLength(2);
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