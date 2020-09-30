import 'reflect-metadata';
import * as assert from 'assert';
import Param from '@Core/BasicDecorator/Argument/Param';
import {ARGUMENT_DECORATOR_KEY} from '@Core/BasicDecorator/Argument/argumentHelper';

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
    const test = Reflect.getMetadata(ARGUMENT_DECORATOR_KEY, TestBodyController);
    assert.strictEqual(test.get('hello')[0].objectTransfer, null);
  });

  it('Have value', function () {
    const test = Reflect.getMetadata(ARGUMENT_DECORATOR_KEY, TestBodyController);
    assert.strictEqual(test.get('haveValue')[0].objectTransfer, 'id');
  });
});
