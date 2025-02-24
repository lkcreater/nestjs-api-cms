import { Body, Controller, Get, Post } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { EV1Constant } from '../v1.constant';
import { OauthVerifyCodeDto } from './dto/oauth-verify-code.dto';

@Controller({
  version: EV1Constant.version,
  path: 'oauth',
})
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('url-authorize')
  findUrl() {
    const url = this.oauthService.getUrlOAuth();
    return {
      url,
    };
  }

  @Post('verify-code')
  async getVerify(@Body() body: OauthVerifyCodeDto) {
    const result = await this.oauthService.getVerifyCode(body);

    const dataToken = await this.oauthService.createToken(result);

    return dataToken;
  }
}
