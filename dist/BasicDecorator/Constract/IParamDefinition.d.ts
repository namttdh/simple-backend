import { ParamsType } from '../../Constant/ParamsType';
export interface IParamDefinition {
    index: number;
    type: ParamsType;
    methodName: string;
    objectTransfer?: any;
}
