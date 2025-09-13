import dotenv from 'dotenv';
dotenv.config();
export default async function seedQuartos() {
  const exemploInsert = [
    ...Array.from({ length: 24 }, (_, i) => ({
      numero: `02${(i + 1).toString().padStart(2, '0')}`,
      tipo: 'Apartamento',
      capacidade: 2,
      preco_base: 50,
      status: 'Disponível',
      itens_padroes: [],
    })),
  ];
  for (const quartoData of exemploInsert) {
    // const existingQuarto = await Quarto.findOne({
    //   numero: quartoData.numero,
    //   loja: quartoData.loja,
    // });
    // if (!existingQuarto) {
    //   const quarto = new Quarto(quartoData);
    //   await quarto.save();
    // }
  }
}

seedQuartos()
  .then(() => console.log('✅ Quartos criados com sucesso!'))
  .catch(err => {
    console.error('❌ Erro ao rodar seed de quartos:', err);
    process.exit(1);
  });
