import {setParamMetadata} from '@Core/BasicDecorator/paramsHelper';
import {ParamsType} from '@Core/Constants/ParamsType';

const Response = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  setParamMetadata(ParamsType.RESPONSE, target, propertyKey, parameterIndex);
};

export default Response;
