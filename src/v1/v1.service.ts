import { Injectable } from '@nestjs/common';

@Injectable()
export class V1Service {
  create() {
    return 'This action adds a new v1';
  }
}
