import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './sample.entity';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
  ) {}

  create(data: Partial<Sample>) {
    return this.sampleRepository.save(this.sampleRepository.create(data));
  }

  async findAll() {
    return (await this.sampleRepository.find()).map((el) => ({
      ...el,
      total: el.puntajeDados + el.puntajeRaspe,
    }));
  }
}
