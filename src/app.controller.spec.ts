import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './database/models/sample/sample.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: SampleService, useValue: {} }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should send "Hello World!" when FRONTEND_URL is not set', () => {
      delete process.env.FRONTEND_URL;
      const res = { send: jest.fn(), redirect: jest.fn() } as any;

      appController.root(res);

      expect(res.send).toHaveBeenCalledWith('Hello World!');
    });

    it('should redirect to FRONTEND_URL when set', () => {
      process.env.FRONTEND_URL = 'https://example.netlify.app';
      const res = { send: jest.fn(), redirect: jest.fn() } as any;

      appController.root(res);

      expect(res.redirect).toHaveBeenCalledWith(
        302,
        'https://example.netlify.app',
      );
      delete process.env.FRONTEND_URL;
    });
  });
});
