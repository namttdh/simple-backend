import {IControllerBuilder} from './Builder/IControllerBuilder';

export const IDecoratorDataName = 'IBasicDecoratorData';

export interface IDecoratorData {
  get(): IControllerBuilder[];

  addController(controller: any): IDecoratorData;
}
