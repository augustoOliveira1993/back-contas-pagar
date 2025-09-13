import {
  IParametroDocument,
  IParametroDTO,
} from '@modules/parametro/dto/IParametroDTO';
import { QueryOptions } from 'mongoose';

export interface IParametroRepository {
  create(data: IParametroDTO): Promise<IParametroDocument>;

  findById(id: string): Promise<IParametroDocument | null>;

  findOne(
    query: QueryOptions<IParametroDTO>,
  ): Promise<IParametroDocument | null>;

  findAll(query?: QueryOptions<IParametroDTO>): Promise<IParametroDocument[]>;

  update(id: string, data: IParametroDTO): Promise<IParametroDocument | null>;

  delete(id: string): Promise<IParametroDocument | null>;

  count(query?: QueryOptions<IParametroDTO>): Promise<number>;
}
