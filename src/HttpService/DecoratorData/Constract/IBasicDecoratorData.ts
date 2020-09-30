import {IControllerBuilder} from '@Core/HttpService/DecoratorData/Constract/Builder/IControllerBuilder';

export const IBasicDecoratorDataName = 'IBasicDecoratorData';

export interface IBasicDecoratorData {
  get(): IControllerBuilder[];

  addController(controller: any): IBasicDecoratorData;
}
