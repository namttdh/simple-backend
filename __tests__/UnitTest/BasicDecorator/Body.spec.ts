import 'reflect-metadata';
import * as assert from 'assert';
import {ARGUMENT_DECORATOR_KEY} from '../../../src/BasicDecorator/Argument/argumentHelper';
import {ParamsType} from '../../../src/Constant/ParamsType';
import {Body} from '../../../src/BasicDecorator/Argument/Body';

describe('Test body params', () => {
  class TestBodyController {
    hello(test2: any, @Body test: any) {
      return test;
    }
  }
  it('Body params success register', function () {
    const test = Reflect.getMetadata(ARGUMENT_DECORATOR_KEY, TestBodyController);
    assert.strictEqual(test.get('hello')[0].type, ParamsType.BODY);
  });
});
