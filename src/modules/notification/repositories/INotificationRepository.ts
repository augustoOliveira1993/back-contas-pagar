import {
  INotificationDTO,
  INotificationDocument,
} from '@modules/notification/dto/INotificationDTO';
import { QueryOptions } from 'mongoose';

export default interface INotificationRepository {
  create(data: INotificationDTO): Promise<INotificationDocument>;
  findById(id: string): Promise<INotificationDocument | null>;
  findAll(
    query?: QueryOptions<INotificationDTO>,
  ): Promise<INotificationDocument[]>;
  update(
    id: string,
    data: INotificationDTO,
  ): Promise<INotificationDocument | null>;
  findOne(
    query: QueryOptions<INotificationDTO>,
  ): Promise<INotificationDocument | null>;
  delete(id: string): Promise<INotificationDocument | null>;
  count(query?: QueryOptions<INotificationDTO>): Promise<number>;
  updateMany(query: QueryOptions<INotificationDTO>, data: INotificationDTO): Promise<any>;
}
