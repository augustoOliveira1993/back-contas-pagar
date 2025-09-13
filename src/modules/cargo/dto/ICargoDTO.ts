import { Document } from 'mongoose';

export interface ICargoDTO {
  codigo?: string;
  nome?: string;
}

export interface ICargoDocument extends ICargoDTO, Document {}
