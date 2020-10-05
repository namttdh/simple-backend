import {BodyArgsResolve} from './ArgsResolve/BodyArgsResolve';
import {ParamArgsResolve} from './ArgsResolve/ParamArgsResolve';
import {ParamsType} from '../../Constant/ParamsType';

export const paramsResolveWorker = () => {
  const resolver: Map<ParamsType, any> = new Map();
  resolver.set(ParamsType.BODY, BodyArgsResolve);
  resolver.set(ParamsType.PARAM, ParamArgsResolve);

  return resolver;
};
