import BaseMiddleware from '../../BaseAbstract/BaseMiddleware';

export type MiddlewareDecoratorProps = BaseMiddleware | string | ((request: any, response: any, next: any) => void);

export interface IMiddlewareDefinition {
  middleware: MiddlewareDecoratorProps;
  methodName?: string;
}
