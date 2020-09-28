import {Request} from 'express';
import {IBodyArgsResolve} from '@Core/HttpService/Constract/ArgsResolve/BodyArgsResolve';

export class BodyArgsResolve implements IBodyArgsResolve {
  async resolve(request?: Request): Promise<any> {
    return request?.body;
  }
}
