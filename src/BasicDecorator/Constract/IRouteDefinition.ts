import HttpMethod from '@Core/Constant/HttpMethod';
import {StatusCodes} from '@Core/Constant/StatusCode';

export interface IRouteDefinition {
  requestMethod: HttpMethod;
  path: string;
  methodName: string | symbol;
  responseCode: number | typeof StatusCodes;
}
