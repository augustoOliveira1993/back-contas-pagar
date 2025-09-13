import { injectable, inject } from 'tsyringe';
import INotificationRepository from '../../repositories/INotificationRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
class DeleteNotificationService {
  constructor(
    @inject('NotificationRepository')
    private repository: INotificationRepository,
  ) {}

  public async execute(id: string) {
    const roleDeleted = await this.repository.delete(id);
    if (!roleDeleted) {
      throw new NotFoundError({ message: 'Notification não encontrada' });
    }
    return {
      success: true,
      message: 'Notification deletada com sucesso!',
      data: {
        id: roleDeleted.id,
      },
    };
  }
}

export default DeleteNotificationService;
