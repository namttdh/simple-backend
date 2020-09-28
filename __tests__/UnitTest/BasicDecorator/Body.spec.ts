import 'reflect-metadata';
import * as assert from 'assert';
import Body from '@Core/BasicDecorator/Body';
import {PARAMS_DECORATOR_KEY} from '@Core/BasicDecorator/paramsHelper';
import {ParamsType} from '@Core/Constants/ParamsType';

describe('Test body params', () => {
  class TestBodyController {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    hello(test2: any, @Body test) {
      return test;
    }
  }
  it('Body params success register', function () {
    const test = Reflect.getMetadata(PARAMS_DECORATOR_KEY, TestBodyController);
    assert.strictEqual(test.get('hello')[0].type, ParamsType.BODY);
  });
});
