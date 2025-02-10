import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: any) => {
        console.log('Handling error locally and rethrowing it...', err);

        let codeError = 30000;
        if (err?.status) {
          codeError = Number(err?.status) * 100;
        }

        return of({
          meta: {
            response_code: codeError,
            response_desc: err?.message ?? 'Server error interpreted',
            response_datetime: new Date(),
          },
        });
      }),
      map((result) => {
        if (result?.meta?.response_code) {
          return result;
        }

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
