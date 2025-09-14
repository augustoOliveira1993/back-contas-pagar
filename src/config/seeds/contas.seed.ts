import { Conta } from '@modules/conta/infra/mongo/models/Conta';
import dotenv from 'dotenv';

dotenv.config();
export default async function seedQuartos() {
  const userId = '68aa7327ee0f4abb8342415b';
  const arrayInsert = [
    {
      user: userId,
      descricao: 'Cartão Alessandra',
      categoria: 'CARTAO',
      valor_total: 153,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'VARIAVEL',
      recorrencia: {
        frequencia: 'MENSAL',
        diaReferencia: 5,
      },
      tags: ['cartão', 'alessandra'],
    },
    {
      user: userId,
      descricao: 'Internet',
      categoria: 'UTILIDADE',
      valor_total: 100,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'RECORRENTE',
      recorrencia: {
        frequencia: 'MENSAL',
        diaReferencia: 5,
      },
      tags: ['internet', 'casa'],
    },
    {
      user: userId,
      descricao: 'INSS',
      categoria: 'TAXA',
      valor_total: 85.72,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'VARIAVEL',
      tags: ['seguridade'],
    },
    {
      user: userId,
      descricao: 'Energia',
      categoria: 'UTILIDADE',
      valor_total: 114.24,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'VARIAVEL',
      tags: ['energia', 'casa'],
    },
    {
      user: userId,
      descricao: 'Fabiana',
      categoria: 'PESSOAL',
      valor_total: 160,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'PARCELADA',
      parcelas: [
        {
          numero: 1,
          valor: 80,
          vencimento: '2025-09-14',
          dataVencimento: '2025-09-14',
          status: 'PENDENTE',
        },
        {
          numero: 2,
          valor: 80,
          vencimento: '2025-10-14',
          dataVencimento: '2025-10-14',
          status: 'PENDENTE',
        },
      ],
    },
    {
      user: userId,
      descricao: 'Empréstimo',
      categoria: 'FINANCEIRO',
      valor_total: 750,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'PARCELADA',
      parcelas: [
        {
          numero: 1,
          valor: 375,
          vencimento: '2025-09-15',
          dataVencimento: '2025-09-15',
          status: 'PENDENTE',
        },
        {
          numero: 2,
          valor: 375,
          vencimento: '2025-10-15',
          dataVencimento: '2025-10-15',
          status: 'PENDENTE',
        },
      ],
    },
    {
      user: userId,
      descricao: 'Água',
      categoria: 'UTILIDADE',
      valor_total: 45,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'RECORRENTE',
      recorrencia: {
        frequencia: 'MENSAL',
        diaReferencia: 5,
      },
      tags: ['água', 'casa'],
    },
    {
      user: userId,
      descricao: 'Chapra Mãe',
      categoria: 'PESSOAL',
      valor_total: 200,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'PARCELADA',
      parcelas: [
        {
          numero: 1,
          valor: 100,
          vencimento: '2025-09-20',
          dataVencimento: '2025-09-20',
          status: 'PENDENTE',
        },
        {
          numero: 2,
          valor: 100,
          vencimento: '2025-10-20',
          dataVencimento: '2025-10-20',
          status: 'PENDENTE',
        },
      ],
    },
    {
      user: userId,
      descricao: 'Perfume',
      categoria: 'PESSOAL',
      valor_total: 125,
      moeda: 'REAL',
      status: 'PENDENTE',
      tipo: 'PARCELADA',
      parcelas: [
        {
          numero: 1,
          valor: 62.5,
          vencimento: '2025-09-10',
          dataVencimento: '2025-09-10',
          status: 'PENDENTE',
        },
        {
          numero: 2,
          valor: 62.5,
          vencimento: '2025-10-10',
          dataVencimento: '2025-10-10',
          status: 'PENDENTE',
        },
      ],
    },
  ];
  for (const quartoData of arrayInsert) {
    const quarto = new Conta(quartoData);
    await quarto.save();
  }
}

seedQuartos()
  .then(() => console.log('✅ Quartos criados com sucesso!'))
  .catch(err => {
    console.error('❌ Erro ao rodar seed de quartos:', err);
    process.exit(1);
  });
