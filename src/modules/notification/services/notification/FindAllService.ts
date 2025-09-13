import { injectable, inject } from 'tsyringe';
import { INotificationDTO } from '../../dto/INotificationDTO';
import INotificationRepository from '../../repositories/INotificationRepository';
import { QueryOptions } from 'mongoose';
import moment from 'moment-timezone';

@injectable()
export default class FindAllService {
  constructor(
    @inject('NotificationRepository')
    private repository: INotificationRepository,
  ) {}

  public async execute(query: QueryOptions<INotificationDTO>) {
    let queryParams: any = {
      $or: [
        { expitaAt: { $gte: moment().tz('America/Sao_Paulo').toDate() } },
        { is_read: false },
      ],
    };
    if (query.search) {
      queryParams = {
        ...queryParams,
        name: { $regex: query.search, $options: 'i' },
      };
    }

    if (query?.limit && query?.limit > 0) {
      queryParams = {
        ...queryParams,
        limit: query.limit,
      };
    }

    if (query?.offset && query?.offset > 0) {
      queryParams = {
        ...queryParams,
        offset: query.offset,
      };
    }

    if (query.category) {
      queryParams = {
        ...queryParams,
        category: { $regex: query.category, $options: 'i' },
      };
    }

    return {
      total: await this.repository.count(queryParams),
      data: await this.repository.findAll(queryParams),
    };
  }
}
