import { Controller, Get } from '@nestjs/common';
import { V1Service } from './v1.service';
import { EV1Constant } from './v1.constant';

@Controller({
  version: EV1Constant.version,
})
export class V1Controller {
  constructor(private readonly v1Service: V1Service) {}

  @Get()
  findAll() {
    return this.v1Service.create();
  }
}
