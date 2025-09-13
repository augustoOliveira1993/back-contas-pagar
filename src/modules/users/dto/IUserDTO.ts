import { Document } from 'mongoose';

export enum EStatusUser {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export interface IUserDTO {
  username: string;
  email: string;
  password?: string;
  roles?: any[];
  permissaos?: any[];
  avatar_url?: string;
  setor?: string;
  pagina_inicial?: string;
  status?: EStatusUser;
  tempo_expiracao_token?: string;
}

export interface IUserDocument extends IUserDTO, Document {}

export interface IDataBodyAddPermissions {
  permissaos: string[];
}

export interface IDataBodyRemoverRoles {
  roles: string[];
}

export interface IResquestQuery {
  search: string | null;
}

export interface IFindAllResponse {
  data: IUserDTO[];
  total: number;
}

export interface IAddRoleDataBody {
  idsRoles: string[];
}
