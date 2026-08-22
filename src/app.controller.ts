import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';
import { SampleService } from './database/models/sample/sample.service';
import { CreateSampleDto } from './database/models/sample/dto/create-sample.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sampleService: SampleService,
  ) {}

  @Get()
  root(@Res() res: Response) {
    const frontendUrl = process.env.FRONTEND_URL;
    if (frontendUrl) {
      return res.redirect(302, frontendUrl);
    }
    return res.send(this.appService.getHello());
  }

  @Post('sample')
  createSample(@Body() body: CreateSampleDto) {
    return this.sampleService.create(body);
  }

  @Get('sample')
  findSamples() {
    return this.sampleService.findAll();
  }
}
