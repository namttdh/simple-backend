import {MiddlewareResolve} from '../../../../../src/HttpService/DecoratorData/Resolve/MiddlewareResolve';
import {Middleware} from '../../../../../src/BasicDecorator/Middleware';
import {Controller} from '../../../../../src/BasicDecorator/Controller';

describe('Test middleware resolve', () => {
  @Middleware()
  class TestMiddleware {
    private test = 0;
    apply() {
      if (this.test === 0) {
        this.test = Math.floor(Math.random() * Math.floor(9999));
      }

      return this.test;
    }
  }

  @Controller()
  @Middleware(TestMiddleware)
  class TestBodyController {
    @Middleware(TestMiddleware)
    hello() {
      //
    }
  }
  it('Test middleware singleton', function () {
    let middlewareResolve = new MiddlewareResolve();
    let middlewareResolveProps = middlewareResolve.resolve(TestBodyController);
    let rs1 = middlewareResolveProps.getRoute().get('hello')[0]();
    let rs2 = middlewareResolveProps.getController()[0]();

    expect(rs1).toBe(rs2);
  });
});
