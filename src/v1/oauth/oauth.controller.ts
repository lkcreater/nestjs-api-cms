import { Controller, Get } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { EV1Constant } from '../v1.constant';

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
}
