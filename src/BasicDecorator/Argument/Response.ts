import {setArgumentMetadata} from '@Core/BasicDecorator/Argument/argumentHelper';
import {ParamsType} from '@Core/Constant/ParamsType';

const Response = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  setArgumentMetadata(ParamsType.RESPONSE, target, propertyKey, parameterIndex);
};

export default Response;
