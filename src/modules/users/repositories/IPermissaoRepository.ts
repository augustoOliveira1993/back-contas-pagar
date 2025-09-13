import {
  IResquestQuery,
  IPermissaoDTO,
  IPermissaoDocument,
} from '@modules/users/dto/IPermissaoDTO';
import { QueryOptions } from 'mongoose';

export default interface IPermissaoRepository {
  create(data: IPermissaoDTO): Promise<IPermissaoDocument>;
  findByName(name: string): Promise<IPermissaoDocument | null>;
  findById(id: string): Promise<IPermissaoDocument | null>;
  findAll(query?: QueryOptions<IPermissaoDTO>): Promise<IPermissaoDocument[]>;
  findOne(
    criterio: QueryOptions<IPermissaoDocument>,
  ): Promise<IPermissaoDocument | null>;
  findAll(query?: IResquestQuery): Promise<IPermissaoDocument[]>;
  update(id: string, data: IPermissaoDTO): Promise<IPermissaoDocument | null>;
  delete(id: string): Promise<IPermissaoDocument | null>;
  deleteMany(): Promise<boolean>;
}
