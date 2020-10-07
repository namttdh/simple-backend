import { IControllerBuilder } from './Builder/IControllerBuilder';
export declare const IDecoratorDataName = "IDecoratorDataName";
export interface IDecoratorData {
    get(): IControllerBuilder[];
    addController(controller: any): IDecoratorData;
}
