import {IControllerBuilder} from './Builder/IControllerBuilder';

export const IDecoratorDataName = 'IDecoratorDataName';

export interface IDecoratorData {
  get(): IControllerBuilder[];

  addController(controller: any): IDecoratorData;
}
