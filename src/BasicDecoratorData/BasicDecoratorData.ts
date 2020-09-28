import {IBasicDecoratorData} from '@Core/BasicDecoratorData/Constract/IBasicDecoratorData';
import {Inject} from '@Core/Container/Decorator/Inject';
import {IControllerResolveName} from '@Core/BasicDecoratorData/Constract/Resolve/IControllerResolve';
import {IControllerBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IControllerBuilder';
import {IRouteResolveName} from '@Core/BasicDecoratorData/Constract/Resolve/IRouteResolve';
import {ControllerResolve} from '@Core/BasicDecoratorData/Resolve/ControllerResolve';
import {RouteResolve} from '@Core/BasicDecoratorData/Resolve/RouteResolve';
import {Singleton} from '@Core/Container/Decorator/Singleton';

@Singleton()
export class BasicDecoratorData implements IBasicDecoratorData {
  private listController: Array<any> = [];

  constructor(
    @Inject(IControllerResolveName) private controllerResolve: ControllerResolve,
    @Inject(IRouteResolveName) private routeResolve: RouteResolve,
  ) {}

  get(): IControllerBuilder[] {
    this.checkListControllerEmpty();
    const controllerBuilders: IControllerBuilder[] = new Array<IControllerBuilder>();

    this.listController.forEach((controller: any) => {
      const controllerBuilder = this.controllerResolve.resolve(controller);
      const routeBuilders = this.routeResolve.resolve(controller);
      controllerBuilder.setRoute(routeBuilders);
      controllerBuilders.push(controllerBuilder);
    });

    return controllerBuilders;
  }

  addController(controller: any): IBasicDecoratorData {
    if (Array.isArray(controller)) {
      this.listController = [this.listController, ...controller];
    } else {
      this.listController.push(controller);
    }

    return this;
  }

  private checkListControllerEmpty() {
    if (!this.listController || this.listController.length === 0) {
      console.log('\x1b[31m%s\x1b[0m', "You' not register any controller");
      process.exit();
    }
  }
}
