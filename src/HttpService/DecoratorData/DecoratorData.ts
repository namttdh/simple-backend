import {IBasicDecoratorData} from '@Core/HttpService/DecoratorData/Constract/IBasicDecoratorData';
import {Inject} from '@Core/Container/Decorator/Inject';
import {
  IControllerResolve,
  IControllerResolveName,
} from '@Core/HttpService/DecoratorData/Constract/Resolve/IControllerResolve';
import {IControllerBuilder} from '@Core/HttpService/DecoratorData/Constract/Builder/IControllerBuilder';
import {IRouteResolve, IRouteResolveName} from '@Core/HttpService/DecoratorData/Constract/Resolve/IRouteResolve';
import {Singleton} from '@Core/Container/Decorator/Singleton';
import {
  IMiddlewareResolve,
  IMiddlewareResolveName,
} from '@Core/HttpService/DecoratorData/Constract/Resolve/IMiddlewareResolve';

@Singleton()
export class DecoratorData implements IBasicDecoratorData {
  private listController: Array<any> = [];

  constructor(
    @Inject(IControllerResolveName) private controllerResolve: IControllerResolve,
    @Inject(IRouteResolveName) private routeResolve: IRouteResolve,
    @Inject(IMiddlewareResolveName) private middlewareResolve: IMiddlewareResolve,
  ) {}

  get(): IControllerBuilder[] {
    this.checkListControllerEmpty();
    const controllerBuilders: IControllerBuilder[] = new Array<IControllerBuilder>();

    this.listController.forEach((controller: any) => {
      //resolve instance for middle both controller and route
      const middlewareResolve = this.middlewareResolve.resolve(controller);

      //resolve controller builder
      const controllerBuilder = this.controllerResolve
        .attachMiddleware(middlewareResolve.getController())
        .resolve(controller);

      //resolve route builder
      const routeBuilders = this.routeResolve.attachMiddleware(middlewareResolve.getRoute()).resolve(controller);

      //set route builder to controller builder
      controllerBuilder.setRoute(routeBuilders);

      //set to global builder
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
