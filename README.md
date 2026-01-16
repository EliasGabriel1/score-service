# ⭐ Score Service

## Descrição

O **Score Service** é responsável por calcular e gerenciar o score financeiro do usuário com base em seu histórico de pagamentos, utilização de crédito e outros fatores.

**Porta:** `3005`

## ⚙️ Responsabilidades

- 📊 **Cálculo de Score** - Gera score financeiro (0-1000)
- 🔍 **Análise de Fatores** - Identifica fatores que influenciam o score
- 💡 **Recomendações** - Sugere melhorias para aumentar o score
- 📈 **Histórico** - Mantém histórico de scores ao longo do tempo
- ⚡ **Recálculo** - Permite recalcular score sob demanda

## 🚀 Endpoints Principais

```bash
GET    /                      # Score atual do usuário
GET    /calculate             # Recalcular score
GET    /recommendation        # Recomendações de melhoria
GET    /factors              # Fatores que compõem o score
GET    /history              # Histórico de scores
```

## 📊 Modelo de Score

```typescript
{
  id: string
  user_id: string
  score: number              // 0-1000
  classification: string     // 'LOW_RISK' | 'MEDIUM' | 'HIGH'
  
  // Fatores
  payment_history: number    // % pagamentos no prazo
  credit_utilization: number // % do limite utilizado
  debt_ratio: number        // Relação dívida/renda
  
  calculated_at: Date
  created_at: Date
}
```

## 🧮 Algoritmo de Cálculo

### Composição do Score (0-1000)

| Fator | Peso | Contribuição |
|-------|------|--------------|
| Histórico de Pagamentos | 35% | 0-350 pontos |
| Utilização de Crédito | 30% | 0-300 pontos |
| Relação Dívida/Renda | 20% | 0-200 pontos |
| Tempo de Histórico | 10% | 0-100 pontos |
| Diversidade de Crédito | 5% | 0-50 pontos |

### Classificação

- **0-300** - HIGH_RISK (Risco Alto)
- **301-700** - MEDIUM (Risco Médio)
- **701-1000** - LOW_RISK (Risco Baixo)

## 🛠️ Tecnologias

- **NestJS** 10+
- **TypeScript** 5+
- **Prisma** 5+ (ORM)
- **PostgreSQL** / **SQLite** (Database)

## 🚀 Instalação

```bash
cd score-service
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/score
# ou
DATABASE_URL=file:./dev.db

PORT=3005
```

## 📦 Rodar a Service

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run build
npm run start:prod
```

## 🔄 Prisma

```bash
# Criar/atualizar banco de dados
npx prisma migrate dev

# Gerar tipos TypeScript
npx prisma generate

# Acessar banco via Prisma Studio
npx prisma studio
```

## 📁 Estrutura

```
src/
├── controller/              # Endpoints HTTP
│   ├── score.controller.ts
│   ├── calculate.controller.ts
│   ├── recommendation.controller.ts
│   ├── factors.controller.ts
│   └── history.controller.ts
├── business/               # Lógica de negócio
├── model/                 # Tipos e interfaces
├── app.module.ts          # Módulo principal
└── main.ts               # Ponto de entrada
```

## 📈 Exemplo de Resposta

### GET /score
```json
{
  "id": "cuid123",
  "userId": "user123",
  "score": 750,
  "classification": "LOW_RISK",
  "paymentHistory": 95,
  "creditUtilization": 35,
  "debtRatio": 25,
  "calculatedAt": "2026-01-16T10:00:00Z"
}
```

### GET /factors
```json
{
  "paymentHistory": {
    "value": 95,
    "contribution": 332.5,
    "status": "Excelente"
  },
  "creditUtilization": {
    "value": 35,
    "contribution": 105,
    "status": "Bom"
  },
  "debtRatio": {
    "value": 25,
    "contribution": 50,
    "status": "Bom"
  }
}
```

### GET /recommendation
```json
[
  {
    "factor": "Utilização de Crédito",
    "current": 35,
    "target": 20,
    "recommendation": "Reduza o uso do cartão para melhorar o score"
  },
  {
    "factor": "Histórico de Pagamentos",
    "current": 95,
    "target": 100,
    "recommendation": "Mantenha o padrão de pagamentos em dia"
  }
]
```

## 🧪 Testes

```bash
npm run test            # Testes unitários
npm run test:watch     # Testes com observer
npm run test:cov       # Cobertura de testes
npm run test:e2e       # Testes E2E
```

## 🔐 Segurança

- ✅ Validação de entrada
- ✅ Dados de usuário isolados (apenas seu próprio score)
- ✅ JWT em todas as rotas
- ✅ Rate limiting em recálculos

## 🚀 Próximos Passos

- [ ] Machine Learning para previsões
- [ ] Benchmarking com usuários similares
- [ ] Simulador de score ("e se aumentasse limite?")
- [ ] Integração com bureau de crédito
- [ ] Notificações de mudanças de score

---

**Desenvolvido com ❤️**  
**Última atualização:** 16 de janeiro de 2026
