import {StatusCodes} from '../../Constant/StatusCode';
import HttpMethod from '../../Constant/HttpMethod';

export interface IRouteDefinition {
  requestMethod: HttpMethod;
  path: string;
  methodName: string | symbol;
  responseCode: number | typeof StatusCodes;
}
