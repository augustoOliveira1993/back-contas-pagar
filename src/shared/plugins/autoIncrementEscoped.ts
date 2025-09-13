import { Schema, Document } from 'mongoose';

interface AutoIncrementOptions<T> {
  field: string; // campo a ser incrementado
  padSize?: number; // quantidade de zeros à esquerda
  scopeField?: keyof T; // campo que define o escopo (default = "loja")
}

export function autoIncrementScoped<T extends Document>(
  schema: Schema<T>,
  options: AutoIncrementOptions<T>,
) {
  const { field, padSize = 4, scopeField = 'loja' as keyof T } = options;

  schema.pre<T>('save', async function (next) {
    if (!this.isNew || (this as any)[field]) return next();

    const scopeValue = (this as any)[scopeField];
    if (!scopeValue) {
      return next(
        new Error(
          `Campo "${String(scopeField)}" é obrigatório para autoincremento.`,
        ),
      );
    }

    // Busca o maior código já existente para a loja na mesma collection
    const Model = this.constructor as any;
    const lastDoc = await Model.findOne({ [scopeField]: scopeValue })
      .sort({ [field]: -1 })
      .select(field)
      .lean();

    let nextSeq = 1;
    if (lastDoc && lastDoc[field]) {
      nextSeq = parseInt(lastDoc[field], 10) + 1;
    }

    (this as any)[field] = nextSeq.toString().padStart(padSize, '0');
    next();
  });
}
