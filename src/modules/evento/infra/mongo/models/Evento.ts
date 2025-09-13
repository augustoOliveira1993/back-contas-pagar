import mongoose, { Schema } from 'mongoose';
import { IEventoDocument } from '@modules/evento/dto/IEventoDTO';
import { autoIncrementCodigo } from '@shared/plugins/autoIncrementCodigo';

const EventoSchema: Schema = new Schema(
  {
    codigo: { type: String },
    foto: { type: String },
    data_evento: { type: String },
    titulo: { type: String },
    descricao: { type: String },
    categoria: { type: String },
    created_by: { type: String },
    updated_by: { type: String },
  },
  {
    timestamps: true,
  },
);

EventoSchema.plugin(autoIncrementCodigo<IEventoDocument>, {
  field: 'codigo',
  startAt: 1,
  padSize: 4,
});

export const Evento = mongoose.model<IEventoDocument>('Evento', EventoSchema);
