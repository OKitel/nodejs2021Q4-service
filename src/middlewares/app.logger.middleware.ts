import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url, query, body } = request;
    const userAgent = request.get('user-agent') || '';
    this.logger.log({ ip, method, url, query, body });
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `method: ${method}, url: ${url}, statusCode: ${statusCode}, query: ${query.to}, body: ${body}, contentLength: ${contentLength} - userAgent: ${userAgent} ip: ${ip}`,
      );
    });

    next();
  }
}
