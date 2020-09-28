import {IRouteBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IRouteBuilder';

export const IRouteResolveName = 'IRouteResolve';

export interface IRouteResolve {
  resolve(controller: any): IRouteBuilder[];
}
