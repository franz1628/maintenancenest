import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

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

    console.log(exception);
    
    
    // Prisma: error de constraint UNIQUE
    if (
      exception instanceof Prisma.PrismaClientKnownRequestError &&
      exception.code === 'P2002'
    ) {
      status = HttpStatus.CONFLICT;
      title = 'Conflict';
      type = 'https://httpstatuses.com/409';
      detail = `Unique constraint failed on field(s): ${exception.meta?.target}`;
    }

    // Prisma: error de FK o relación
    else if (
      exception instanceof Prisma.PrismaClientKnownRequestError &&
      exception.code === 'P2003'
    ) {
      status = HttpStatus.BAD_REQUEST;
      title = 'Invalid relation';
      type = 'https://httpstatuses.com/400';
      detail = `Invalid relation reference: ${exception.meta?.field_name}`;
    }
    

    // NestJS HttpException normal
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        detail = res;
      } else if (typeof res === 'object') {
        detail = (res as any).message ?? JSON.stringify(res);
      }
      type = `https://httpstatuses.com/${status}`;
      title = HttpStatus[status] ?? 'Error';
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
