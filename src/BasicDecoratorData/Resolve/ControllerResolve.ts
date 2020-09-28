import {IControllerResolve} from '@Core/BasicDecoratorData/Constract/Resolve/IControllerResolve';
import {IControllerBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IControllerBuilder';
import {CONTROLLER_DECORATOR_KEY} from '@Core/BasicDecorator/Controller';
import {ControllerBuilder} from '@Core/BasicDecoratorData/Builder/ControllerBuilder';
import {getMetadata} from '@Core/Helper.js';

export class ControllerResolve implements IControllerResolve {
  resolve(controller: any): IControllerBuilder {
    const controllerBuilder = new ControllerBuilder();
    const path = getMetadata(CONTROLLER_DECORATOR_KEY, controller) as string;
    controllerBuilder.setPath(path);

    return controllerBuilder;
  }
}
