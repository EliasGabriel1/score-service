import { Injectable } from '@nestjs/common';
import { BffAdapter } from './adapter/bff.adapter';


@Injectable()
export class CalculateService {

  constructor(private readonly bffAdapter: BffAdapter) {}

  private readonly RISCOS_MAP: Record<number, string> = {
    0: 'MUITO ALTO',
    1: 'MUITO ALTO',
    2: 'MUITO ALTO',
    3: 'ALTO',
    4: 'ALTO',
    5: 'MODERADO',
    6: 'MODERADO',
    7: 'BAIXO',
    8: 'BAIXO',
    9: 'EXCELENTE',
    10: 'EXCELENTE'
  };


  async calcular(userId: string) {
    let score = 400;
    const fatores: any = [];

    const dadosfinanceiro = await this.bffAdapter.dadosFinanceiroUsuario({ userId });
    const dados = dadosfinanceiro.data;

    const dti = (dados.totalDebt / dados.monthlyIncome) * 100;

    if (dti > 50) {
      score -= 150;
      fatores.push({ type: 'NEGATIVO', desc: 'Endividamento muito alto em relação à renda.' });
    } else if (dti < 15) {
      score += 100;
      fatores.push({ type: 'POSITIVO', desc: 'Excelente controle de dívidas.' });
    }



    if (dados.creditCardUsage > 70) {
      score -= 120;
      fatores.push({ type: 'NEGATIVO', desc: 'Uso excessivo do limite do cartão de crédito.' });
    } else if (dados.creditCardUsage < 30) {
      score += 80;
      fatores.push({ type: 'POSITIVO', desc: 'Uso consciente do crédito disponível.' });
    }



    const sobra = dados.monthlyIncome - dados.monthlyExpenses;
    const margemSeguranca = (sobra / dados.monthlyIncome) * 100;

    if (margemSeguranca < 10) {
      score -= 100;
      fatores.push({ type: 'NEGATIVO', desc: 'Margem de segurança financeira apertada.' });
    } else if (margemSeguranca > 30) {
      score += 50;
      fatores.push({ type: 'POSITIVO', desc: 'Boa capacidade de poupança mensal.' });
    }



    if (dados.totalDebt > (dados.monthlyIncome * 5)) {
      score -= 200;
      fatores.push({ type: 'CRITICO', desc: 'Volume de dívida total excede capacidade de pagamento.' });
    }


    score = Math.max(0, Math.min(1000, score));

    return {
      novoScore: Math.round(score),
      nivelRisco: this.definirRisco(score),
      fatores
    };
  }

  private definirRisco(score: number): string {
    const centena = Math.floor(score / 100);
    return this.RISCOS_MAP[centena] || 'MUITO ALTO';
  }
}