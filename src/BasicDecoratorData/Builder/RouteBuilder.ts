import {IRouteBuilder} from '@Core/BasicDecoratorData/Constract/Builder/IRouteBuilder';
import {IParamDefinition} from '@Core/BasicDecorator/Constract/IParamDefinition';
import HttpMethod from '@Core/Constants/HttpMethod';
import {StatusCodes} from '@Core/Constants/StatusCode';
import {IMiddlewareDefinition} from '@Core/BasicDecorator/Constract/IMiddlewareDefinition';

export class RouteBuilder implements IRouteBuilder {
  private middleware: Array<any> = [];
  private params: Array<IParamDefinition> = [];
  private method: HttpMethod = HttpMethod.GET;
  private path?: string;
  private functionName?: string;
  private responseCode: typeof StatusCodes | number = StatusCodes.OK;

  addMiddleware(middleware: IMiddlewareDefinition | IMiddlewareDefinition[]): IRouteBuilder {
    if (Array.isArray(middleware)) {
      this.middleware = [...this.middleware, ...middleware];
    } else {
      this.middleware.push(middleware);
    }

    return this;
  }

  getMiddleware(): IMiddlewareDefinition[] {
    return this.middleware ?? [];
  }

  setMethod(method: HttpMethod): IRouteBuilder {
    this.method = method;

    return this;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  setPath(path: string): IRouteBuilder {
    this.path = path;

    return this;
  }

  getPath(): string {
    return this.path ?? '';
  }

  addParam(param: IParamDefinition | IParamDefinition[]): IRouteBuilder {
    if (Array.isArray(param)) {
      this.params = [...this.params, ...param];
    } else {
      this.params.push(param);
    }

    return this;
  }

  getParams(): IParamDefinition[] {
    return this.params;
  }

  setResponseCode(code: typeof StatusCodes | number): IRouteBuilder {
    this.responseCode = code;

    return this;
  }

  getResponseCode(): typeof StatusCodes | number {
    return this.responseCode;
  }

  setFunctionName(name: string): IRouteBuilder {
    this.functionName = name;

    return this;
  }

  getFunctionName(): string {
    return this.functionName ?? '';
  }
}
