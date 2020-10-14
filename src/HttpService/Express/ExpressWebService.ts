import {Inject} from '../../Container/Decorator/Inject';
import {IDecoratorData, IDecoratorDataName} from '../DecoratorData/Constract/IDecoratorData';
import {IControllerBuilder} from '../DecoratorData/Constract/Builder/IControllerBuilder';
import express, {Application, NextFunction, Request, Response} from 'express';
import {paramsResolveWorker} from './customParamsResolve';
import {IRouteBuilder} from '../DecoratorData/Constract/Builder/IRouteBuilder';
import {StatusCodes} from '../../Constant/StatusCode';
import {IParamDefinition} from '../../BasicDecorator/Constract/IParamDefinition';
import {ParamsType} from '../../Constant/ParamsType';
import {Container} from '../../Container';
import {Singleton} from '../../Container/Decorator/Singleton';
import {IWebService} from '../Constract/IWebService';

@Singleton()
export class ExpressWebService implements IWebService {
  private readonly expressApplication: Application;
  private paramRegister: Map<ParamsType, any>;

  constructor(@Inject(IDecoratorDataName) private decoratorData: IDecoratorData) {
    this.expressApplication = express();
    this.paramRegister = paramsResolveWorker();
  }

  instance(): Application {
    return this.expressApplication;
  }

  run(): void {
    //build controller, need refactor to multiple class
    let controllerBuilder = this.decoratorData.get();
    controllerBuilder.forEach((controller) => {
      this.buildController(controller, controller.getRoute());
    });
  }

  buildController(controller: IControllerBuilder, routes: IRouteBuilder[]): void {
    const controllerInstance = Container.resolve<any>(controller.getControllerClass());
    routes.forEach((route) => {
      let paramsSort = route.getParams();
      this.instance()[route.getMethod()](
        controller.getPath() + route.getPath(),
        [...controller.getMiddleware(), ...route.getMiddleware()],
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

  private async resolveRouteParams(
    paramDefinition: IParamDefinition,
    request: Request,
    response: Response,
  ): Promise<any> {
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
