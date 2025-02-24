import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { EV1Constant } from '../v1.constant';
import { SignInAuthenticationDto } from './dto/signin-authentication.dto';
@Controller({
  version: EV1Constant.version,
  path: 'authentication',
})
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);

  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInAuthenticationDto) {
    return this.authenticationService.verifyAuthentication(body);
  }

  @Get('url')
  findAll() {
    const url = this.authenticationService.getUrlOAuth();
    this.logger.log(url);
    return {
      url,
    };
  }
}
