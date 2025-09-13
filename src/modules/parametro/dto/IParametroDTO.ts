import { Document } from 'mongoose';

export interface IParametroDTO {
  codigo?: string;
  key?: string;
  value?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface IParametroDocument extends IParametroDTO, Document {}
