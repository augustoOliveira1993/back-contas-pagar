import { injectable, inject } from 'tsyringe';
import INotificationRepository from '../../repositories/INotificationRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
class CreateService {
  constructor(
    @inject('NotificationRepository')
    private repository: INotificationRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new NotFoundError({ message: 'Notification não encontrada' });
    }
    return roleExist;
  }
}

export default CreateService;
