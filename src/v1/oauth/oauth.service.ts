import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OauthVerifyCodeDto } from './dto/oauth-verify-code.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
export interface IOktaAccessToken {
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
  refresh_token: string;
  id_token: string;
}
@Injectable()
export class OauthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private jwtService: JwtService
  ) {}

  private getConfigEnvironment() {
    return {
      host: this.configService.get<string>('OKTA_HOST'),
      endpoint: this.configService.get<string>('OKTA_URI_ENDPOINT_OAUTH'),
      client_id: this.configService.get<string>('OKTA_CLIENT_ID'),
      client_secret: this.configService.get<string>('OKTA_CLIENT_SECRET'),
      redirect_uri: this.configService.get<string>('OKTA_REDIRECT_URI'),
      response_type: this.configService.get<string>('OKTA_RESPONSE_TYPE'),
      state: this.configService.get<string>('OKTA_STATE'),
      nonce: this.configService.get<string>('OKTA_NONCE'),
      scope: this.configService.get<string>('OKTA_SCOPE'),
      jwt_secret_key: this.configService.get<string>('JWT_SECRET_KEY'),
      jwt_expires_in: this.configService.get<string>('JWT_EXPIRES_IN'),
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
      const url = new URL(`${host}${path}/${pathAuthorize}`);
      for (const [key, value] of Object.entries(queryParams)) {
        url.searchParams.set(key, value);
      }

      return url.toString();
    } catch (error) {
      throw new BadRequestException(`Error OAuth invalid URL authorize`);
    }
  }

  async getVerifyCode(body: OauthVerifyCodeDto): Promise<IOktaAccessToken> {
    const config = this.getConfigEnvironment();
    const host = config.host;
    const path = config.endpoint;

    const payloads = {
      grant_type: 'authorization_code',
      redirect_uri: config.redirect_uri,
      client_id: config.client_id,
      client_secret: config.client_secret,
      code: body?.code
    }

    const params = new URLSearchParams();
    for(const [key, value] of Object.entries(payloads)){
        params.append(key, value);
    } 

    try {
      const res = await firstValueFrom(this.httpService.request({
        method: 'POST',
        url: `${host}${path}/token`,
        params: params
      }))

      if(res.status !== 200) {
        throw new BadRequestException('Bad request status [axios]: ' + res.status);
      }
      
      return res?.data ?? null;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createToken(okta: IOktaAccessToken) {
    try {
      const config = this.getConfigEnvironment();

      if(!okta?.id_token) {
        throw new BadRequestException('Required Id Token');
      }
      
      const decode = this.jwtService.decode(okta?.id_token);
      const dataAccess = {
        uid: decode?.sub,
        name: decode?.name,
        nonce: decode?.nonce,
        hash: decode?.at_hash,
        refresh_token: okta?.refresh_token
      }

      const token = await this.jwtService.signAsync(dataAccess, {
        secret: config?.jwt_secret_key,
        expiresIn: config?.jwt_expires_in
      });
      const decodeToken = this.jwtService.decode(token);

      return {
        token_type: okta?.token_type,
        access_token: okta?.access_token,
        scope: okta?.scope,
        refresh_token: okta?.refresh_token,
        id_token: okta?.id_token,
        token,
        session_expire: decodeToken?.exp
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
