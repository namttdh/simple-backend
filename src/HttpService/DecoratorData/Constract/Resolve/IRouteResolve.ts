import {IRouteBuilder} from '../Builder/IRouteBuilder';

export const IRouteResolveName = 'IRouteResolve';

export interface IRouteResolve {
  resolve(controller: any): IRouteBuilder[];
  attachMiddleware(middleware: Map<string, any>): IRouteResolve;
}
