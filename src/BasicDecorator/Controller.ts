import {Singleton} from '@Core/Container/Decorator/Singleton';

export const CONTROLLER_DECORATOR_KEY = Symbol('controller_prefix');

const Controller = (prefix = ''): ClassDecorator => {
  prefix = prefix[0] === '/' ? prefix : '/' + prefix;

  return (target: any) => {
    Singleton()(target);
    Reflect.defineMetadata(CONTROLLER_DECORATOR_KEY, prefix, target);
  };
};

export default Controller;
