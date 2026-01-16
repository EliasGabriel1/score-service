import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class HistoryScoreRepository {
  constructor(private prisma: PrismaService) {}

  getHistory(scoreId?: string) {
    const where = scoreId ? { scoreId } : {};
    return this.prisma.scoreHistory.findMany({
      where: { where },
      orderBy: { referenceMonth: 'desc' }
    });
  }

  create(scoreId: string, scoreValue: number, referenceMonth: Date) {
    return this.prisma.scoreHistory.create({
      data: {
        scoreId,
        scoreValue,
        referenceMonth
      }
    });
  }

  saveHistory(data: { scoreId: string; scoreValue: number; referenceMonth: Date }) {
    return this.prisma.scoreHistory.create({
      data: {
        scoreId: data.scoreId,
        scoreValue: data.scoreValue,
        referenceMonth: data.referenceMonth
      }
    });
  } 
}