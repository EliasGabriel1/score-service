import { Controller, Get } from '@nestjs/common';
import { ScoreService } from '../business/score.service';

@Controller('')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  async buscarScore(userId?: string) {
    return await this.scoreService.buscarScore(userId);
  }
}
