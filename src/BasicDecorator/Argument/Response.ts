import {setArgumentMetadata} from './argumentHelper';
import {ParamsType} from '../../Constant/ParamsType';

export const Response = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  setArgumentMetadata(ParamsType.RESPONSE, target, propertyKey, parameterIndex);
};
