import { ESituacaoColaborador } from '@modules/colaborador/dto/IColaboradorDTO';
import {
  IColaboradorDocument,
  IColaboradorDTO,
} from '@modules/colaborador/dto/IColaboradorDTO';
import { EStatusColaborador } from '@modules/colaborador/dto/IColaboradorDTO';
import { autoIncrementCodigo } from '@shared/plugins/autoIncrementCodigo';
import { autoIncrementScoped } from '@shared/plugins/autoIncrementEscoped';
import mongose, { Schema } from 'mongoose';

const schema: Schema = new Schema<IColaboradorDTO>(
  {
    codigo: { type: String },
    nome: { type: String },
    cargo: { type: String },
    foto: { type: String },
    situacao: {
      type: String,
      enum: Object.values(ESituacaoColaborador),
      default: ESituacaoColaborador.ATIVO,
    },
    created_by: { type: String, default: null },
    updated_by: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

schema.plugin(autoIncrementCodigo<IColaboradorDocument>, {
  field: 'codigo',
  startAt: 1,
  padSize: 4,
});

export const Colaborador = mongose.model<IColaboradorDocument>(
  'Colaborador',
  schema,
);
