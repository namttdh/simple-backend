import {IControllerBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IControllerBuilder';

export const IControllerResolveName = 'IControllerResolveName';

export interface IControllerResolve {
  resolve(controller: any): IControllerBuilder;
}
