import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { EV1Constant } from '../v1.constant';
import { SignInAuthenticationDto } from './dto/sigin-authentication.dto';

@Controller({
  version: EV1Constant.version,
  path: 'authentication',
})
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInAuthenticationDto) {
    return body;
  }

  @Get('url')
  findAll() {
    const url = this.authenticationService.getUrlOAuth();
    return {
      url,
    };
  }
}
