import { Document } from 'mongoose';

export enum ESituacaoColaborador {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  PENDENTE = 'PENDENTE',
  REDUCAO = 'REDUCAO',
  SUSPENSO = 'SUSPENSO',
  DEMITIDO = 'DEMITIDO',
  AFASTADO = 'AFASTADO',
  AFASTADO_TEMPORARIO = 'AFASTADO_TEMPORARIO',
  AFASTADO_PERMANENTE = 'AFASTADO_PERMANENTE',
}

export enum EStatusColaborador {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export interface IColaboradorDTO {
  codigo: string;
  nome: any;
  foto: any;
  cargo: string;
  situacao: ESituacaoColaborador;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface IColaboradorDocument extends IColaboradorDTO, Document {}
