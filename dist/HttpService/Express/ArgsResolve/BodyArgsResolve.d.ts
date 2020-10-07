import { Request } from 'express';
import { IBodyArgsResolve } from '../../Constract/ArgsResolve/BodyArgsResolve';
export declare class BodyArgsResolve implements IBodyArgsResolve {
    resolve(request?: Request): Promise<any>;
}
