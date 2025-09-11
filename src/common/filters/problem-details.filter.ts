import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let title = 'Internal Server Error';
    let detail: string | object = 'An unexpected error occurred';
    let type = 'about:blank';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        detail = res;
      } else if (typeof res === 'object') {
        const obj = res as Record<string, any>;
        detail = obj.message ?? JSON.stringify(res);
      }

      switch (status) {
        case HttpStatus.NOT_FOUND:
          title = 'Resource not found';
          type = 'https://httpstatuses.com/404';
          break;
        case HttpStatus.BAD_REQUEST:
          title = 'Bad Request';
          type = 'https://httpstatuses.com/400';
          break;
        case HttpStatus.UNAUTHORIZED:
          title = 'Unauthorized';
          type = 'https://httpstatuses.com/401';
          break;
        case HttpStatus.FORBIDDEN:
          title = 'Forbidden';
          type = 'https://httpstatuses.com/403';
          break;
        default:
          title = 'Error';
          type = `https://httpstatuses.com/${status}`;
      }
    }

    response.status(status).json({
      type,
      title,
      status,
      detail,
      instance: request.url,
    });
  }
}
