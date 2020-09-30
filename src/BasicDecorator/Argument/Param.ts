import {setArgumentMetadata} from '@Core/BasicDecorator/Argument/argumentHelper';
import {ParamsType} from '@Core/Constant/ParamsType';

const Param = (...args: any[]): any => {
  if (args.length == 1) {
    return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
      setArgumentMetadata(ParamsType.PARAM, target, propertyKey, parameterIndex, args[0]);
    };
  } else {
    setArgumentMetadata(ParamsType.PARAM, args[0], args[1], args[2], null);
  }
};

export default Param;
