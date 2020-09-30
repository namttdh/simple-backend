import {IControllerResolve} from '@Core/HttpService/DecoratorData/Constract/Resolve/IControllerResolve';
import {IControllerBuilder} from '@Core/HttpService/DecoratorData/Constract/Builder/IControllerBuilder';
import {CONTROLLER_DECORATOR_KEY} from '@Core/BasicDecorator/Controller';
import {ControllerBuilder} from '@Core/HttpService/DecoratorData/Builder/ControllerBuilder';
import {getMetadata} from '@Core/Helper';
import {Injectable} from '@Core/Container/Decorator/Injectable';

@Injectable()
export class ControllerResolve implements IControllerResolve {
  private middleware: Array<any> = [];

  resolve(controller: any): IControllerBuilder {
    const controllerBuilder = new ControllerBuilder();
    const path = getMetadata(CONTROLLER_DECORATOR_KEY, controller) as string;
    controllerBuilder.setPath(path);
    controllerBuilder.addMiddleware(this.middleware);

    return controllerBuilder;
  }

  attachMiddleware(middleware: Array<any>): IControllerResolve {
    this.middleware = middleware;

    return this;
  }
}
