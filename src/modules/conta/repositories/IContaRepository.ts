import { IContaDocument, IContaDTO } from '@modules/conta/dto/IContaDTO';
import { QueryOptions } from 'mongoose';

export interface IContaRepository {
  create(data: IContaDTO): Promise<IContaDocument>;

  findById(id: string): Promise<IContaDocument | null>;

  findOne(query: QueryOptions<IContaDTO>): Promise<IContaDocument | null>;

  findAll(query?: QueryOptions<IContaDTO>): Promise<IContaDocument[]>;

  update(id: string, data: IContaDTO): Promise<IContaDocument | null>;

  delete(id: string): Promise<IContaDocument | null>;

  count(query?: QueryOptions<IContaDTO>): Promise<number>;
}
