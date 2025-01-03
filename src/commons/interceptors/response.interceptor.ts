import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        let data = {};
        if (result) {
          data = {
            data: result,
          };
        }

        return {
          meta: {
            response_code: 20000,
            response_desc: 'success',
            response_datetime: new Date(),
          },
          ...data,
        };
      }),
    );
  }
}
