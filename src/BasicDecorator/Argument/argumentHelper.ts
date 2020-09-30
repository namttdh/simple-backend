import {IParamDefinition} from '@Core/BasicDecorator/Constract/IParamDefinition';

export const ARGUMENT_DECORATOR_KEY = Symbol('list_params');

export const setArgumentMetadata = (
  paramsType: any,
  target: any,
  propertyKey: any,
  parameterIndex: any,
  objectTransfer?: any,
) => {
  const methods =
    (Reflect.getMetadata(ARGUMENT_DECORATOR_KEY, target.constructor) as Map<string, Array<IParamDefinition>>) ??
    new Map();
  const params = methods.get(propertyKey) ?? [];
  params.unshift({
    index: parameterIndex,
    type: paramsType,
    methodName: propertyKey,
    objectTransfer,
  });
  methods.set(propertyKey, params);
  Reflect.defineMetadata(ARGUMENT_DECORATOR_KEY, methods, target.constructor);
};
