import request from 'supertest';
import {ExpressWebService} from '../../../src/HttpService/Express';
import {Container} from '../../../src/Container';
import {Controller} from '../../../src/BasicDecorator/Controller';
import {Route} from '../../../src/BasicDecorator/Route';
import {ExpressProvider} from '../../../src/HttpService/Express/ExpressProvider';
import {IDecoratorData, IDecoratorDataName} from '../../../src/HttpService/DecoratorData/Constract/IDecoratorData';
import {Param} from '../../../src/BasicDecorator/Argument/Param';

describe('Express server test', () => {
  Container.resolve(ExpressProvider);
  @Controller('test')
  class TestController {
    @Route({path: '1'})
    async test() {
      return 'hello world';
    }

    @Route({path: '2/:id'})
    async test2(@Param('id') id: string) {
      return id;
    }
  }

  it('Test start service express success', async () => {
    let decoratorData: IDecoratorData = Container.resolve(IDecoratorDataName);
    decoratorData.addController(TestController);

    let expressWebService = Container.resolve(ExpressWebService);
    expressWebService.run();
    let result = await request(expressWebService.instance()).get('/test/1');
    expect(result.text).toBe('hello world');
  });

  it('Test with param', async () => {
    let decoratorData: IDecoratorData = Container.resolve(IDecoratorDataName);
    decoratorData.addController(TestController);

    let expressWebService = Container.resolve(ExpressWebService);
    expressWebService.run();
    let result = await request(expressWebService.instance()).get('/test/2/test-param');
    expect(result.text).toBe('test-param');
  });
});
