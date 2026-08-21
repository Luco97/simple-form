import { Body, Controller, Get, Post } from '@nestjs/common';
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
  getHello(): string {
    return this.appService.getHello();
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
