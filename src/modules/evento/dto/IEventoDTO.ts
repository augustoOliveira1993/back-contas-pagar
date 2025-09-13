import { Document } from 'mongoose';

export interface IEventoDTO {
  codigo?: string;
  foto?: any;
  data_evento?: string | null;
  titulo?: string | null;
  descricao?: string | null;
  categoria?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface IEventoDocument extends IEventoDTO, Document {}
