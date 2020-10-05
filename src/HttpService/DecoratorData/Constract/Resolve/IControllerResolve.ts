import {IControllerBuilder} from '../Builder/IControllerBuilder';

export const IControllerResolveName = 'IControllerResolveName';

export interface IControllerResolve {
  resolve(controller: any): IControllerBuilder;
  attachMiddleware(middleware: Array<any>): IControllerResolve;
}
