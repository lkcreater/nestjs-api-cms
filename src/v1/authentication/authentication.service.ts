import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(private configService: ConfigService) {}

  private getConfigEnvironment() {
    return {
      host: this.configService.get<string>('OKTA_HOST'),
      endpoint: this.configService.get<string>('OKTA_URI_ENDPOINT_OAUTH'),
      client_id: this.configService.get<string>('OKTA_CLIENT_ID'),
      redirect_uri: this.configService.get<string>('OKTA_REDIRECT_URI'),
      response_type: this.configService.get<string>('OKTA_RESPONSE_TYPE'),
      state: this.configService.get<string>('OKTA_STATE'),
      nonce: this.configService.get<string>('OKTA_NONCE'),
      scope: this.configService.get<string>('OKTA_SCOPE'),
    };
  }

  getUrlOAuth() {
    const config = this.getConfigEnvironment();
    const host = config.host;
    const path = config.endpoint;
    const pathAuthorize = 'authorize';

    const queryParams = {
      client_id: config.client_id,
      redirect_uri: config.redirect_uri,
      response_type: config.response_type,
      state: config.state,
      nonce: config.nonce,
      scope: config.scope,
    };

    try {
      const url = new URL(`${path}/${pathAuthorize}`);
      for (const [key, value] of Object.entries(queryParams)) {
        url.searchParams.set(key, value);
      }

      return url.toString();
    } catch (error) {
      throw new BadRequestException(`Error OAuth invalid URL authorize`);
    }
  }
}
