import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUsers } from '../../entities/system-users.entity';
import { Repository } from 'typeorm';
import { SignInAuthenticationDto } from './dto/signin-authentication.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(SystemUsers)
    private repoSystemUsers: Repository<SystemUsers>,
  ) {}

  verifyAuthentication(body: SignInAuthenticationDto) {
    return {
      ...body,
      hash: bcrypt.hashSync(body?.password, 12),
    };
  }

  getUrlOAuth() {
    try {
      return '';
    } catch (error) {
      throw new BadRequestException(`Error OAuth invalid URL authorize`);
    }
  }
}
