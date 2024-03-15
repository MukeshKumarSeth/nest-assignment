// transformation.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessageKey } from '../utils/response.decorator';
import "reflect-metadata";

@Injectable()
export class TransformationInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = Reflect.getMetadata(ResponseMessageKey,context.getHandler()) // Get the custom message
    return next.handle().pipe(
      map(data => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message,
        data,
      })),
    );
  }
}
