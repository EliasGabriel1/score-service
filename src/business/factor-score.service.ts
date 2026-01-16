import { Injectable } from '@nestjs/common';
import { ScoreFactorRepository } from './repository/factor-score.repository';


@Injectable()
export class ScoreFactorService {
  constructor(private readonly scoreRepository: ScoreFactorRepository) { }
  async buscarFactors(userId?: string) {
    return await this.scoreRepository.getFactors(userId);
  }
}