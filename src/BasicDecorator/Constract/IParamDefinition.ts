import {ParamsType} from '@Core/Constant/ParamsType';

export interface IParamDefinition {
  index: number;
  type: ParamsType;
  methodName: string;
  objectTransfer?: any;
}
