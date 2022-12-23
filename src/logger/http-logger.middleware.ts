import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to cleanly log HTTP requests/responses.
 * Similar to what express-winston library can do in a non-NestJS context.
 */
@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const httpHost = request.get('host') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      this.logger.debug(
        `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
        'HttpLoggerMiddleware',
        {
          http_host: httpHost,
          http_port: httpHost.includes(':') ? parseInt(httpHost.split(':').slice(-1)[0], 10) : undefined,
          http_path: request?.path,
          http_query_string: request?.query,
          http_status_code: statusCode,
          http_method: method,
          http_useragent: userAgent,
          http_version: request?.httpVersion,
        },
      );
    });
    next();
  }
}
