import { IRouteBuilder } from '../Constract/Builder/IRouteBuilder';
import { IParamDefinition } from '../../../BasicDecorator/Constract/IParamDefinition';
import { StatusCodes } from '../../../Constant/StatusCode';
import HttpMethod from '../../../Constant/HttpMethod';
export declare class RouteBuilder implements IRouteBuilder {
    private middleware;
    private params;
    private method;
    private path?;
    private functionName?;
    private responseCode;
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
    setFunctionName(name: string): IRouteBuilder;
    getFunctionName(): string;
}
