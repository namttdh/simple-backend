import {ParamsType} from '@Core/Constants/ParamsType';
import {setParamMetadata} from '@Core/BasicDecorator/paramsHelper';

const Body = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  const types = Reflect.getMetadata('design:paramtypes', target, propertyKey);
  setParamMetadata(ParamsType.BODY, target, propertyKey, parameterIndex, types[parameterIndex]);
};

export default Body;
