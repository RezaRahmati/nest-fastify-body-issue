import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddlewareService implements NestMiddleware {
  use(request: any, response: any, next: any) {
    console.log('body', request.body);
    console.log('query', request.query);
    console.log('headers', request.headers);
    console.log('url', request.url);

    next();
  }
}
