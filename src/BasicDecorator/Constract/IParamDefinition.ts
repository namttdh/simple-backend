import {ParamsType} from '@Core/Constants/ParamsType';

export interface IParamDefinition {
  index: number;
  type: ParamsType;
  methodName: string;
  objectTransfer?: any;
}
