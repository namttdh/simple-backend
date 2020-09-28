import 'reflect-metadata';
import * as assert from 'assert';
import Param from '@Core/BasicDecorator/Param';
import {PARAMS_DECORATOR_KEY} from '@Core/BasicDecorator/paramsHelper';

describe('Test params', () => {
  class TestBodyController {
    hello(@Param test: any) {
      //
    }
    haveValue(@Param('id') test: any) {
      //
    }
  }
  it("Haven't value", function () {
    const test = Reflect.getMetadata(PARAMS_DECORATOR_KEY, TestBodyController);
    assert.strictEqual(test.get('hello')[0].objectTransfer, null);
  });

  it('Have value', function () {
    const test = Reflect.getMetadata(PARAMS_DECORATOR_KEY, TestBodyController);
    assert.strictEqual(test.get('haveValue')[0].objectTransfer, 'id');
  });
});
