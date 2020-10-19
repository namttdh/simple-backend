export default abstract class BaseMiddleware {
  abstract _apply(request: any, response: any, next: any): void;
}
