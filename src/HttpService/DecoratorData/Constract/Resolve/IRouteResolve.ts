import {IRouteBuilder} from '@Core/HttpService/DecoratorData/Constract/Builder/IRouteBuilder';

export const IRouteResolveName = 'IRouteResolve';

export interface IRouteResolve {
  resolve(controller: any): IRouteBuilder[];
  attachMiddleware(middleware: Map<string, any>): IRouteResolve;
}
