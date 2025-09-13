import { injectable, inject } from 'tsyringe';
import { INotificationDTO } from '../../dto/INotificationDTO';
import INotificationRepository from '../../repositories/INotificationRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
export default class ReadNotifyService {
  constructor(
    @inject('NotificationRepository')
    private repository: INotificationRepository,
  ) {}

  public async execute(
    idNotification: string,
    data: INotificationDTO,
    userEmail: string | undefined,
  ) {
    const notify = await this.repository.findById(idNotification);
    if (!notify) {
      throw new NotFoundError({ message: 'Notification não encontrada' });
    }
    const updateNotification = await this.repository.update(idNotification, {
      is_read: true,
      updated_by: userEmail,
    });
    return updateNotification;
  }
}
