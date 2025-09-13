import { injectable, inject } from 'tsyringe';
import { INotificationDTO } from '../../dto/INotificationDTO';
import INotificationRepository from '../../repositories/INotificationRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
export default class ReadAllNotifyService {

  constructor(
    @inject('NotificationRepository')
    private repository: INotificationRepository,
  ) {}

  public async execute(userEmail: string | undefined) {
    const updateNotification = await this.repository.updateMany({
      is_read: false,
    }, {
      is_read: true,
      updated_by: userEmail,
    });
    return updateNotification;
  }
}
