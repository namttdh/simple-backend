import HttpMethod from '@Core/Constants/HttpMethod';
import {StatusCodes} from '@Core/Constants/StatusCode';

export interface IRouteDefinition {
  requestMethod: HttpMethod;
  path: string;
  methodName: string | symbol;
  responseCode: number | typeof StatusCodes;
}
