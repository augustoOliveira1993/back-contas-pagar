import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const seedArg = process.argv.find(arg => arg.startsWith('--seed='));
  const seedName = seedArg ? seedArg.split('=')[1] : null;

  await mongoose.connect(process.env.MONGODB_URI as string);

  const seedsDir = path.resolve(__dirname);
  const files = fs
    .readdirSync(seedsDir)
    .filter(f => f.endsWith('.seed.ts') || f.endsWith('.seed.js'));

  if (seedName) {
    // executa só um seed
    const file = files.find(f => f.startsWith(seedName));
    if (!file) {
      console.error(`❌ Seed "${seedName}" não encontrado.`);
      process.exit(1);
    }
    console.log(`▶ Executando seed: ${file}`);
    const seedModule = await import(path.join(seedsDir, file));
    await seedModule.default();
  } else {
    // executa todos os seeds
    for (const file of files) {
      console.log(`▶ Executando seed: ${file}`);
      const seedModule = await import(path.join(seedsDir, file));
      await seedModule.default();
    }
  }

  console.log('✅ Seeds finalizados!');
  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Erro ao rodar seeds:', err);
  process.exit(1);
});
