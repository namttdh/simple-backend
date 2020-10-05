import {Inject} from '../../Container/Decorator/Inject';
import {IDecoratorData, IDecoratorDataName} from '../DecoratorData/Constract/IDecoratorData';
import {IControllerBuilder} from '../DecoratorData/Constract/Builder/IControllerBuilder';
import express, {Application, NextFunction, Request, Response} from 'express';
import {paramsResolveWorker} from './customParamsResolve';
import {IWebService} from '../Constract/IWebService';
import {IRouteBuilder} from '../DecoratorData/Constract/Builder/IRouteBuilder';
import {StatusCodes} from '../../Constant/StatusCode';
import {IParamDefinition} from '../../BasicDecorator/Constract/IParamDefinition';
import {ParamsType} from '../../Constant/ParamsType';
import {Container} from '../../Container';
import {Singleton} from '../../Container/Decorator/Singleton';

@Singleton()
export class ExpressWebService implements IWebService {
  private readonly expressApplication: Application;
  private paramRegister: Map<ParamsType, any>;

  constructor(@Inject(IDecoratorDataName) private decoratorData: IDecoratorData) {
    this.expressApplication = express();
    this.paramRegister = paramsResolveWorker();
  }

  instance(): any {
    return this.expressApplication;
  }

  express() {
    return express;
  }

  run(): void {
    //build controller, need refactor to multiple class
    let controllerBuilder = this.decoratorData.get();
    controllerBuilder.forEach((controller) => {
      this.buildController(controller, controller.getRoute());
    });

    //start service
    this.instance().listen(process.env.APPLICATION_PORT ?? 3000, () => {
      console.log('\x1b[32m%s\x1b[0m', 'Application running');
    });
  }

  buildController(controller: IControllerBuilder, routes: IRouteBuilder[]): void {
    const controllerInstance = Container.resolve<any>(controller.getControllerClass());
    routes.forEach((route) => {
      let paramsSort = route.getParams();
      this.instance()[route.getMethod()](
        controller.getPath() + route.getPath(),
        route.getMiddleware(),
        async (request: Request, response: Response, next: NextFunction) => {
          let params = [];
          for (const param of paramsSort) {
            params[param.index] = await this.resolveRouteParams(param, request, response);
          }

          try {
            let result = await controllerInstance[route.getFunctionName()].apply(controllerInstance as any, params);
            if (!response.headersSent) {
              response.status(route.getResponseCode() as number).send(result);
            }
          } catch (e) {
            console.log(e);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: true, message: 'server error'});
          }
        },
      );
    });
  }

  async resolveRouteParams(paramDefinition: IParamDefinition, request: Request, response: Response) {
    switch (paramDefinition.type) {
      case ParamsType.REQUEST:
        return request;
      case ParamsType.RESPONSE:
        return response;
      default:
        let resolver = this.paramRegister.get(paramDefinition.type);
        if (resolver) {
          return await new resolver().resolve(request, response, paramDefinition.objectTransfer);
        }

        return undefined;
    }
  }
}
