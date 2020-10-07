import { Request, Response } from 'express';
import { IParamArgsResolve } from '../../Constract/ArgsResolve/ParamArgsResolve';
export declare class ParamArgsResolve implements IParamArgsResolve {
    resolve(request?: Request, response?: Response, param?: any): Promise<any>;
}
