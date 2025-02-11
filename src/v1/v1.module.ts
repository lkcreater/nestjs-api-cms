import { Module } from '@nestjs/common';
import { V1Service } from './v1.service';
import { V1Controller } from './v1.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from '../commons/interceptors/response.interceptor';
import { OauthModule } from './oauth/oauth.module';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  controllers: [V1Controller],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    V1Service,
  ],
  imports: [AuthenticationModule, OauthModule],
})
export class V1Module {}
