import { Controller, Get } from '@nestjs/common';
import { CalculateService } from 'src/business/calculate.service';

@Controller('calculate')
export class CalculateController {
  constructor(private readonly scoreService: CalculateService) {}

  @Get()
  async calcular(userId?: string) {
    return await this.scoreService.calcular(userId);
  }
}
