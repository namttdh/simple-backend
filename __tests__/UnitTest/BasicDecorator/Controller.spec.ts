import * as assert from 'assert';
import {container} from 'tsyringe';
import Controller from '@Core/BasicDecorator/Controller';

describe('Test controller', () => {
  @Controller('test')
  class TestBodyController {
    public random;
    constructor() {
      this.random = Math.floor(Math.random() * Math.floor(9999));
    }
  }
  it('Test controller singleton', function () {
    const controller1 = container.resolve(TestBodyController);
    const controller2 = container.resolve(TestBodyController);

    assert.strictEqual(controller1.random, controller2.random);
  });
});
