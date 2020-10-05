import {Request} from 'express';
import {IBodyArgsResolve} from '../../Constract/ArgsResolve/BodyArgsResolve';

export class BodyArgsResolve implements IBodyArgsResolve {
  async resolve(request?: Request): Promise<any> {
    return request?.body;
  }
}
