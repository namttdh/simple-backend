import * as assert from 'assert';
import {container} from 'tsyringe';
import {Middleware} from '@Core/BasicDecorator/Middleware';

describe('Test middleware', () => {
  @Middleware()
  class TestMiddleware {
    public random: number;
    constructor() {
      this.random = Math.floor(Math.random() * Math.floor(9999));
    }
  }

  it('Test middleware singleton', function () {
    const controller1 = container.resolve(TestMiddleware);
    const controller2 = container.resolve(TestMiddleware);

    assert.strictEqual(controller1.random, controller2.random);
  });
});
