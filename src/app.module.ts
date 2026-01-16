import { Module } from '@nestjs/common';
import { ScoreController } from './controller/score.controller';
import { ScoreService } from './business/score.service';
import { ScoreRepository } from './business/repository/score.repository';

@Module({
  imports: [],
  controllers: [
    ScoreController
  ],
  providers: [
    ScoreService,
    ScoreRepository,
  ],
})
export class AppModule {}
