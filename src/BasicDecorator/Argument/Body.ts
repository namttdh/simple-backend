import {setArgumentMetadata} from './argumentHelper';
import {ParamsType} from '../../Constant/ParamsType';

export const Body = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  const types = Reflect.getMetadata('design:paramtypes', target, propertyKey);
  setArgumentMetadata(ParamsType.BODY, target, propertyKey, parameterIndex, types[parameterIndex]);
};
