import { Controller, Get } from '@nestjs/common';
import { ScoreFactorService } from 'src/business/factor-score.service';

@Controller('factors')
export class ScoreFactorController {
  constructor(private readonly scoreFactorService: ScoreFactorService) {}

  @Get()
  async buscarFactors(userId?: string) {
    return await this.scoreFactorService.buscarFactors(userId);
  }
}
