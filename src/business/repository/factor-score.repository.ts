import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class ScoreFactorRepository {
  constructor(private prisma: PrismaService) {}

  getFactors(scoreId?: string) {
    const where = scoreId ? { scoreId } : {};
    return this.prisma.scoreFactor.findMany({
      where: { where }
    });
  }

  addFactor(
    scoreId: string,
    factorType: string,
    impactValue: number,
    description?: string
  ) {
    return this.prisma.scoreFactor.create({
      data: {
        scoreId,
        factorType,
        impactValue,
        description
      }
    });
  }
}
