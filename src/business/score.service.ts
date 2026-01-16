import { Injectable } from '@nestjs/common';
import { ScoreRepository } from './repository/score.repository';
import { CalculateService } from './calculate.service';
import { HistoryScoreRepository } from './repository/history-score.repository';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly calculateService: CalculateService,
    private readonly historyService: HistoryScoreRepository
  ) {}

  async buscarScore(userId: string) {
    return await this.scoreRepository.buscarScore(userId);
  }

  async atualizarScore(userId: string) {

    const { novoScore, nivelRisco, fatores }: any = await this.calculateService.calcular(userId);

    const scoreAtualizado = await this.scoreRepository.updateScore(userId, {
      currentScore: novoScore,
      riskLevel: nivelRisco,
    });

    await this.historyService.saveHistory({
      scoreId: scoreAtualizado.id,
      scoreValue: novoScore,
      referenceMonth: new Date(),
    });

    return scoreAtualizado;
  }
}