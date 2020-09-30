import HttpMethod from '@Core/Constant/HttpMethod';
import {IParamDefinition} from '@Core/BasicDecorator/Constract/IParamDefinition';
import {StatusCodes} from '@Core/Constant/StatusCode';

export interface IRouteBuilder {
  addMiddleware(middleware: any | Array<any>): IRouteBuilder;

  getMiddleware(): Array<any>;

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
