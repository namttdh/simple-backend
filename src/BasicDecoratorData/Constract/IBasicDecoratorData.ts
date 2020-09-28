import {IControllerBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IControllerBuilder';

export const IBasicDecoratorDataName = 'IBasicDecoratorData';

export interface IBasicDecoratorData {
  get(): IControllerBuilder[];

  addController(controller: any): IBasicDecoratorData;
}
