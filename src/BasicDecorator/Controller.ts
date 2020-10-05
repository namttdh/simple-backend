import {Singleton} from '../Container/Decorator/Singleton';

export const CONTROLLER_DECORATOR_KEY = Symbol('controller_prefix');

export const Controller = (prefix = ''): ClassDecorator => {
  prefix = prefix[0] === '/' ? prefix : '/' + prefix;

  return (target: any) => {
    Singleton()(target);
    Reflect.defineMetadata(CONTROLLER_DECORATOR_KEY, prefix, target);
  };
};
