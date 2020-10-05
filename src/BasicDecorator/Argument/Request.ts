import {setArgumentMetadata} from './argumentHelper';
import {ParamsType} from '../../Constant/ParamsType';

export const Request = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  setArgumentMetadata(ParamsType.REQUEST, target, propertyKey, parameterIndex);
};
