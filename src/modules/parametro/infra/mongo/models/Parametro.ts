import mongoose, { Schema } from 'mongoose';
import { IParametroDocument } from '@modules/parametro/dto/IParametroDTO';
import { autoIncrementCodigo } from '@shared/plugins/autoIncrementCodigo';

const ParametroSchema: Schema = new Schema(
  {
    codigo: { type: String },
    key: { type: String },
    value: { type: String },
    created_by: { type: String },
    updated_by: { type: String },
  },
  {
    timestamps: true,
  },
);

ParametroSchema.plugin(autoIncrementCodigo<IParametroDocument>, {
  field: 'codigo',
  startAt: 1,
  padSize: 4,
});

export const Parametro = mongoose.model<IParametroDocument>(
  'Parametro',
  ParametroSchema,
);
