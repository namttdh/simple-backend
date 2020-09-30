import {ParamsType} from '@Core/Constant/ParamsType';
import {setArgumentMetadata} from '@Core/BasicDecorator/Argument/argumentHelper';

const Body = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  const types = Reflect.getMetadata('design:paramtypes', target, propertyKey);
  setArgumentMetadata(ParamsType.BODY, target, propertyKey, parameterIndex, types[parameterIndex]);
};

export default Body;
