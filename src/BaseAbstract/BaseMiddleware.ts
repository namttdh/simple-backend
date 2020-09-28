abstract class BaseMiddleware {
  abstract apply(request: any, response: any, next: any): void;
}

export default BaseMiddleware;
