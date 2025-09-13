import {
  IColaboradorDTO,
  IColaboradorDocument,
} from '@modules/colaborador/dto/IColaboradorDTO';
import { QueryOptions } from 'mongoose';

export default interface IColaboradorRepository {
  create(data: IColaboradorDTO): Promise<IColaboradorDocument>;
  findById(id: string): Promise<IColaboradorDocument | null>;
  findOne(
    query: QueryOptions<IColaboradorDTO>,
  ): Promise<IColaboradorDocument | null>;
  findAll(
    query?: QueryOptions<IColaboradorDTO>,
  ): Promise<IColaboradorDocument[]>;
  update(
    id: string,
    data: IColaboradorDTO,
  ): Promise<IColaboradorDocument | null>;
  delete(id: string): Promise<IColaboradorDocument | null>;
  count(query?: QueryOptions<IColaboradorDTO>): Promise<number>;
  addItemFichaColaborador(
    id: string,
    itemsIds: string[],
  ): Promise<IColaboradorDocument | null>;
}
