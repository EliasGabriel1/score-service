import { Controller, Get } from '@nestjs/common';
import { RecommendationService } from 'src/business/recommendation.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  async buscarScore(userId?: string) {
    return await this.recommendationService.buscarScore(userId);
  }
}
