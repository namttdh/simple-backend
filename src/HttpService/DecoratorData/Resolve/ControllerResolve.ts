import {Injectable} from '../../../Container/Decorator/Injectable';
import {IControllerResolve} from '../Constract/Resolve/IControllerResolve';
import {IControllerBuilder} from '../Constract/Builder/IControllerBuilder';
import {ControllerBuilder} from '../Builder/ControllerBuilder';
import {getMetadata} from '../../../Helper';
import {CONTROLLER_DECORATOR_KEY} from '../../../BasicDecorator/Controller';

@Injectable()
export class ControllerResolve implements IControllerResolve {
  private middleware: Array<any> = [];

  resolve(controller: any): IControllerBuilder {
    const controllerBuilder = new ControllerBuilder();
    const path = getMetadata(CONTROLLER_DECORATOR_KEY, controller) as string;
    controllerBuilder.setPath(path);
    controllerBuilder.addMiddleware(this.middleware);
    controllerBuilder.setControllerClass(controller);

    return controllerBuilder;
  }

  attachMiddleware(middleware: Array<any>): IControllerResolve {
    this.middleware = middleware;

    return this;
  }
}
