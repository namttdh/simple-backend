import {ParamsType} from '@Core/Constants/ParamsType';
import {setParamMetadata} from '@Core/BasicDecorator/paramsHelper';

const Request = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  setParamMetadata(ParamsType.REQUEST, target, propertyKey, parameterIndex);
};

export default Request;
