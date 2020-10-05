import {Inject} from '../../Container/Decorator/Inject';
import {IControllerResolve, IControllerResolveName} from './Constract/Resolve/IControllerResolve';
import {IRouteResolve, IRouteResolveName} from './Constract/Resolve/IRouteResolve';
import {IMiddlewareResolve, IMiddlewareResolveName} from './Constract/Resolve/IMiddlewareResolve';
import {Singleton} from '../../Container/Decorator/Singleton';
import {IDecoratorData} from './Constract/IDecoratorData';
import {IControllerBuilder} from './Constract/Builder/IControllerBuilder';

@Singleton()
export class DecoratorData implements IDecoratorData {
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

  addController(controller: any): IDecoratorData {
    if (Array.isArray(controller)) {
      this.listController = [this.listController, ...controller];
    } else {
      this.listController.push(controller);
    }

    return this;
  }

  private checkListControllerEmpty() {
    if (!this.listController || this.listController.length === 0) {
      console.log('\x1b[31m%s\x1b[0m', 'Controllers not found. Register those by addController');
      process.exit();
    }
  }
}
