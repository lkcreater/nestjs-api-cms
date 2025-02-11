import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUsers } from '../../entities/system-users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(SystemUsers)
    private repoSystemUsers: Repository<SystemUsers>,
  ) {}

  // verifyAuthentication(username: string, password: string) {}

  getUrlOAuth() {
    try {
      return '';
    } catch (error) {
      throw new BadRequestException(`Error OAuth invalid URL authorize`);
    }
  }
}
