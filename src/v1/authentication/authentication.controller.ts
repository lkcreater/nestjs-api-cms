import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { EV1Constant } from '../v1.constant';

@Controller({
  version: EV1Constant.version,
  path: 'authentication',
})
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('url')
  findAll() {
    const url = this.authenticationService.getUrlOAuth();
    return {
      url,
    };
  }
}
