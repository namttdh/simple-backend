import {Request, Response} from 'express';
import {IParamArgsResolve} from '../../Constract/ArgsResolve/ParamArgsResolve';

export class ParamArgsResolve implements IParamArgsResolve {
  async resolve(request?: Request, response?: Response, param?: any): Promise<any> {
    if (param) {
      return request?.params[param];
    }

    return request?.params;
  }
}
