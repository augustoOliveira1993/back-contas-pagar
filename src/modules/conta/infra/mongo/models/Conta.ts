import mongoose, { Schema } from 'mongoose';
import {
  EContaStatus,
  EContaTipo,
  EFormaPagamento,
  EFrequencia,
  IContaDocument,
  IContaDTO,
  IPagamento,
  IParcela,
  IRecorrencia,
} from '@modules/conta/dto/IContaDTO';
import { autoIncrementCodigo } from '@shared/plugins/autoIncrementCodigo';

const PagamentoSchema = new Schema<IPagamento>(
  {
    data: { type: Date },
    forma: {
      type: String,
      enum: Object.values(EFormaPagamento),
    },
    observacao: { type: String },
  },
  { _id: false },
);

const ParcelaSchema = new Schema<IParcela>(
  {
    numero: { type: Number },
    valor: { type: Number },
    vencimento: { type: Date },
    status: {
      type: String,
      enum: Object.values(EContaStatus),
      default: EContaStatus.PENDENTE,
    },
    pagamento: { type: PagamentoSchema },
  },
  { _id: false },
);

const recorrenciaSchema = new Schema<IRecorrencia>(
  {
    frequencia: {
      type: String,
      enum: Object.values(EFrequencia),
    },
    diaReferencia: { type: Number },
  },
  { _id: false },
);

const ContaSchema = new Schema<IContaDocument>(
  {
    codigo: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    descricao: { type: String },
    categoria: { type: String },
    valor_total: { type: Number },
    moeda: { type: String },
    recorrencia: { type: recorrenciaSchema },
    data_vencimento: { type: Date },
    status: {
      type: String,
      enum: Object.values(EContaStatus),
      default: EContaStatus.PENDENTE,
    },
    tipo: {
      type: String,
      enum: Object.values(EContaTipo),
    },
    notas: { type: String },
    tags: { type: [String], default: [] },
    parcelas: { type: [ParcelaSchema], default: [] },
    created_by: { type: String, default: null },
    updated_by: { type: String, default: null },
  },
  { timestamps: true },
);

ContaSchema.plugin(autoIncrementCodigo<IContaDocument>, {
  field: 'codigo',
  startAt: 1,
  padSize: 4,
});

export const Conta = mongoose.model<IContaDocument>('Conta', ContaSchema);
