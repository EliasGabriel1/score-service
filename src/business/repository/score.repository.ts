import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ScoreRepository {
  constructor(private prisma: PrismaService) {}

  buscarScore(userId?: string) {
    const where = userId ? { userId } : {};
    return this.prisma.score.findFirst({
      where: where,
      include: {
        factors: true,
        history: true
      }
    });
  }

  create(userId: string, score: number) {
    return this.prisma.score.create({
      data: {
        userId,
        currentScore: score,
        riskLevel: this.getRisk(score)
      }
    });
  }

  private getRisk(score: number) {
    if (score >= 700) return 'LOW';
    if (score >= 500) return 'MEDIUM';
    return 'HIGH';
  }

  updateScore(userId: string, data: { currentScore: number; riskLevel: string }) {
    return this.prisma.score.updateMany({
      where: { userId },
      data: {
        currentScore: data.currentScore,
        riskLevel: data.riskLevel,
        updatedAt: new Date()
      }
    });
  }
}