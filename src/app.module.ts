import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [ConfigModule.forRoot(), LeaderboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
