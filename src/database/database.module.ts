import { Module } from '@nestjs/common';
import { SampleService } from './models/sample/sample.service';
import { Sample } from './models/sample/sample.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [SampleService],
  exports: [SampleService],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('DATABASE_URL'),
        database: configService.get('DATABASE_NAME'),
        entities: [Sample],
        synchronize: configService.get('NODE_ENV') !== 'production',
        useUnifiedTopology: true,
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([Sample]),
  ],
})
export class DatabaseModule {}
