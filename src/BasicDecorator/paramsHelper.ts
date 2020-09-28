import {IParamDefinition} from '@Core/BasicDecorator/Constract/IParamDefinition';

export const PARAMS_DECORATOR_KEY = Symbol('list_params');

export const setParamMetadata = (paramsType: any, target: any, propertyKey: any, parameterIndex: any, objectTransfer?: any) => {
  const methods = (Reflect.getMetadata(PARAMS_DECORATOR_KEY, target.constructor) as Map<string, Array<IParamDefinition>>) ?? new Map();
  const params = methods.get(propertyKey) ?? [];
  params.unshift({
    index: parameterIndex,
    type: paramsType,
    methodName: propertyKey,
    objectTransfer,
  });
  methods.set(propertyKey, params);
  Reflect.defineMetadata(PARAMS_DECORATOR_KEY, methods, target.constructor);
};
