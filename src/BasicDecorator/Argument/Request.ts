import {ParamsType} from '@Core/Constant/ParamsType';
import {setArgumentMetadata} from '@Core/BasicDecorator/Argument/argumentHelper';

const Request = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  setArgumentMetadata(ParamsType.REQUEST, target, propertyKey, parameterIndex);
};

export default Request;
