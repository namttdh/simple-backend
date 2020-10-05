import * as assert from 'assert';
import {Request} from 'express';
import {ParamArgsResolve} from '../../../../../src/HttpService/Express/ArgsResolve/ParamArgsResolve';

describe('Test resolve param', () => {
  it("Haven't value", async () => {
    const resolve = new ParamArgsResolve();
    const request = {
      params: {},
    };
    const result = await resolve.resolve(request as Request, undefined, undefined);
    assert.strictEqual(result, request.params);
  });

  it('Have value', async () => {
    const resolve = new ParamArgsResolve();
    const request = {
      params: {
        test: 1,
      },
    };
    const result = await resolve.resolve((request as unknown) as Request, undefined, 'test');
    assert.strictEqual(result, 1);
  });
});
