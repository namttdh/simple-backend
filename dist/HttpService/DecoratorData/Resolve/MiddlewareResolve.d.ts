import { IMiddlewareResolve, MiddlewareResolveProps } from '../Constract/Resolve/IMiddlewareResolve';
export declare class MiddlewareResolve implements IMiddlewareResolve {
    private readonly instanceMiddleware;
    resolve(controller: any): MiddlewareResolveProps;
    private resolveSingleton;
}
