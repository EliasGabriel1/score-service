import { Controller, Get } from '@nestjs/common';
import { HistoryScoreService } from 'src/business/history-score.service';

@Controller('history')
export class HistoryScoreController {
  constructor(private readonly scoreHistoricoService: HistoryScoreService) {}

  @Get()
  async buscarScore(userId?: string) {
    return await this.scoreHistoricoService.buscarScore(userId);
  }
}
