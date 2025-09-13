import { Model, QueryOptions } from 'mongoose';
import { Notification } from '@modules/notification/infra/mongo/models/Notification';
import {
  INotificationDTO,
  INotificationDocument,
} from '@modules/notification/dto/INotificationDTO';
import INotificationRepository from '@modules/notification/repositories/INotificationRepository';
import { IModelPopulated } from '@shared/types/global';
import moment from 'moment-timezone';

export default class NotificationRepository implements INotificationRepository {
  private model: Model<INotificationDocument>;
  private modelPopulated: IModelPopulated[] = [];

  constructor() {
    this.model = Notification;
    this.modelPopulated = [
      {
        path: 'user',
        select: 'username email',
      },
    ];
  }

  async create(data: INotificationDTO): Promise<INotificationDocument> {
    const created = new this.model(data);
    return await created.save();
  }

  async findAll(
    query: QueryOptions<INotificationDTO>,
  ): Promise<INotificationDocument[]> {
    const {
      sortBy = 'createdAt',
      sortDesc = true,
      offset = 0,
      limit,
      ...restQuery
    } = query;

    let mongooseQuery = this.model.find(restQuery).populate(this.modelPopulated);

    if (sortBy) {
      mongooseQuery = mongooseQuery.sort({ [sortBy]: sortDesc ? -1 : 1 });
    }

    if (offset && offset > 0) {
      mongooseQuery = mongooseQuery.skip(offset);
    }

    if (limit && limit > 0) {
      mongooseQuery = mongooseQuery.limit(limit);
    }

    return await mongooseQuery.exec();
  }

  async update(
    id: string,
    data: INotificationDTO,
  ): Promise<INotificationDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<INotificationDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<INotificationDocument | null> {
    return await this.model.findById(id);
  }

  async count(query?: QueryOptions<INotificationDTO>): Promise<number> {
    const {
      sortBy = 'createdAt',
      sortDesc = true,
      offset = 0,
      limit,
      ...restQuery
    }: any = query;

    let mongooseQuery = this.model.countDocuments(restQuery);

    if (offset && offset > 0) {
      mongooseQuery = mongooseQuery.skip(offset);
    }
    if (limit && limit > 0) {
      return mongooseQuery.limit(limit);
    }
    return mongooseQuery.exec();
  }

  async findOne(criterio: any = {}): Promise<INotificationDocument | null> {
    const { sortDesc = true, sortBy = 'createdAt', ...restQuery } = criterio;
    if (sortBy && sortDesc) {
      return await this.model
        .findOne(restQuery)
        .populate(this.modelPopulated)
        .sort({
          [sortBy]: sortDesc ? -1 : 1,
        });
    }
    return await this.model.findOne(restQuery).populate(this.modelPopulated);
  }

    async updateMany(
      query: QueryOptions<INotificationDTO> = {},
      data: INotificationDTO,
    ): Promise<any> {
      return await this.model
        .updateMany(query, data)
        .populate(this.modelPopulated);
    }
}
