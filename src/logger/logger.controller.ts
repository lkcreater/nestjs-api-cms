import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('logger')
export class LoggerController {
  @Get()
  home(@Res() res: Response) {
    return res.render('home', {
      message: 'Hello world!',
    });
  }
}
