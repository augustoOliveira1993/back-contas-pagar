import {
  IPermissaoGrupoDTO,
  IPermissaoGrupoFindAllResponse,
  IPermissaoGrupoDocument,
} from '@modules/users/dto/IPermissaoGrupoDTO';
import { FilterQuery, QueryOptions } from 'mongoose';

export default interface IPermissaoGrupoRepository {
  create(data: IPermissaoGrupoDTO): Promise<IPermissaoGrupoDocument>;
  findByName(name: string): Promise<IPermissaoGrupoDocument | null>;
  findById(id: string): Promise<IPermissaoGrupoDocument | null>;
  findAll(
    query?: QueryOptions<IPermissaoGrupoDTO>,
  ): Promise<IPermissaoGrupoDocument[]>;
  findOne(
    criterio: QueryOptions<IPermissaoGrupoDTO>,
  ): Promise<IPermissaoGrupoDocument | null>;
  update(
    id: string,
    data: IPermissaoGrupoDTO,
  ): Promise<IPermissaoGrupoDocument | null>;
  delete(id: string): Promise<IPermissaoGrupoDocument | null>;
  deleteMany(): Promise<boolean>;
}
