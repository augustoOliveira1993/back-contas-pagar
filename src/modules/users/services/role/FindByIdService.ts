import { injectable, inject } from 'tsyringe';
import { NotFoundError } from '@shared/errors/AppError';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';

@injectable()
class CreateService {
  constructor(
    @inject('RoleRepository')
    private repository: IRoleRepository,
  ) {}

  public async execute(id: string) {
    const exist = await this.repository.findById(id);
    if (!exist) {
      throw new NotFoundError({ message: 'Role não encontrada' });
    }
    return exist;
  }
}

export default CreateService;
