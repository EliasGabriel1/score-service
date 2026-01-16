import { Injectable } from '@nestjs/common';
import { HistoryScoreRepository } from './repository/history-score.repository';


@Injectable()
export class HistoryScoreService {
    constructor( private readonly historyScoreRepository: HistoryScoreRepository) {}
  async buscarScore(userId?: string) {
    return await this.historyScoreRepository.getHistory(userId);
  }
}