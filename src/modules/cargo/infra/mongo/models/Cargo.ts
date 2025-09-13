import mongoose, { Schema } from 'mongoose';
import { ICargoDocument } from '@modules/cargo/dto/ICargoDTO';
import { autoIncrementScoped } from '@shared/plugins/autoIncrementEscoped';
import { autoIncrementCodigo } from '@shared/plugins/autoIncrementCodigo';

const CargoSchema: Schema = new Schema(
  {
    codigo: { type: String },
    nome: { type: String },
  },
  {
    timestamps: true,
  },
);

CargoSchema.plugin(autoIncrementCodigo<ICargoDocument>, {
  field: 'codigo',
  padSize: 5,
  startAt: 1,
});

export const Cargo = mongoose.model<ICargoDocument>('Cargo', CargoSchema);
