import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommendationService {
  
  private readonly ESTRATEGIAS_DICAS = {
    DIVIDA_ALTA: {
      titulo: 'Reduza o Endividamento',
      dica: 'Sua dívida total compromete muito sua renda. Tente renegociar parcelas.'
    },
    CARTAO_CRITICO: {
      titulo: 'Limite de Cartão',
      dica: 'O uso do seu cartão está acima de 70%. Pague o total da fatura para subir seu score.'
    },
    POUPANCA_BAIXA: {
      titulo: 'Margem de Segurança',
      dica: 'Suas despesas estão muito próximas da sua renda. Crie uma reserva de emergência.'
    }
  };

  async gerarRecomendacoes(dados: { totalDebt: number, monthlyIncome: number, creditCardUsage: number }) {
    const recomendacoes: Array<{ titulo: string; dica: string }> = [];
    if (dados.totalDebt > (dados.monthlyIncome * 0.5)) {
      recomendacoes.push(this.ESTRATEGIAS_DICAS.DIVIDA_ALTA);
    }

    if (dados.creditCardUsage > 70) {
      recomendacoes.push(this.ESTRATEGIAS_DICAS.CARTAO_CRITICO);
    }

    return recomendacoes;
  }
}