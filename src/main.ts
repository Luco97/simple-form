import { setServers } from 'dns';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

// El resolver DNS local (VPN/proxy en 127.0.0.1) no responde bien las
// consultas SRV que necesita `mongodb+srv://`; se fuerza uno público.
// Solo aplica fuera de producción: en Heroku el resolver por defecto funciona bien.
if (process.env.NODE_ENV !== 'production') {
  setServers(['8.8.8.8', '1.1.1.1']);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:3000').split(','),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
