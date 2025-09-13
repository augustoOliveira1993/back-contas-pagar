import { IEventoDocument, IEventoDTO } from '@modules/evento/dto/IEventoDTO';
import { QueryOptions } from 'mongoose';

export interface IEventoRepository {
  create(data: IEventoDTO): Promise<IEventoDocument>;

  findById(id: string): Promise<IEventoDocument | null>;

  findOne(query: QueryOptions<IEventoDTO>): Promise<IEventoDocument | null>;

  findAll(query?: QueryOptions<IEventoDTO>): Promise<IEventoDocument[]>;

  update(id: string, data: IEventoDTO): Promise<IEventoDocument | null>;

  delete(id: string): Promise<IEventoDocument | null>;

  count(query?: QueryOptions<IEventoDTO>): Promise<number>;
}
