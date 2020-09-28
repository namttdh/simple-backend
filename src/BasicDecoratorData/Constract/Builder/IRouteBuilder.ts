import {IMiddlewareDefinition} from '@Core/BasicDecorator/Constract/IMiddlewareDefinition';
import HttpMethod from '@Core/Constants/HttpMethod';
import {IParamDefinition} from '@Core/BasicDecorator/Constract/IParamDefinition';
import {StatusCodes} from '@Core/Constants/StatusCode';

export interface IRouteBuilder {
  addMiddleware(middleware: IMiddlewareDefinition | IMiddlewareDefinition[]): IRouteBuilder;

  getMiddleware(): IMiddlewareDefinition[];

  setMethod(method: HttpMethod): IRouteBuilder;

  getMethod(): HttpMethod;

  setPath(path: string): IRouteBuilder;

  getPath(): string;

  addParam(param: IParamDefinition | IParamDefinition[]): IRouteBuilder;

  getParams(): IParamDefinition[];

  setResponseCode(code: typeof StatusCodes | number): IRouteBuilder;

  getResponseCode(): typeof StatusCodes | number;

  setFunctionName(name: string | symbol): IRouteBuilder;

  getFunctionName(): string;
}
